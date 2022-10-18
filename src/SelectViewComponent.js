import { useEffect, useState, useRef } from 'react';
import { 
  Text,
  StyleSheet,
  ScrollView, 
  View, 
  TouchableOpacity,
  Animated
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import NoteView from './components/NoteView';
import { deleteNotes } from './features/notes';
import { setSelectedId } from './features/selectView';

export const SelectViewComponent = () => {
  const notes = useSelector((state) => state.notes.value);
  const selectedInitial = useSelector((state) => state.selectView.id);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const dispatch = useDispatch();

  const checkHighlight = (noteId) => {
    return selectedNotes.some(id => id === noteId);
  }
  
  useEffect(() => {
    setSelectedNotes([selectedInitial]);
    console.log(selectedNotes);
    fadeIn();
    setIsFirstRender(true);
  }, []);

  useEffect(() => {
    if (selectedNotes.length === 0 && isFirstRender) {
      dispatch(setSelectedId(null));
    }
  }, [selectedNotes]);

  const hahdleSelect = (noteId) => {
    setSelectedNotes(prev => {
      if (prev && prev.some(id => id === noteId)) {
        return prev.filter(id => id !== noteId);
      }
      return [...prev, noteId];
    });
  }

  return (
    <Animated.View style={{...styles.main, opacity: fadeAnim}}>
      <TouchableOpacity 
        style={styles.addNoteButton}
        onPress={() => {
          dispatch(setSelectedId(null));
          dispatch(deleteNotes(selectedNotes));
        }}
      >
        <Text 
          style={styles.addNote}
          adjustsFontSizeToFit
        >
          {'✓'}
        </Text>
      </TouchableOpacity>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 10 }}>
        <View style={styles.row}>
          {notes.map(note => (
            <TouchableOpacity
              key={note.id}
              onPress={() => {
                hahdleSelect(note.id);
              }}
            >
            <View 
              style={{...styles.card, 
                backgroundColor: 
                  checkHighlight(note.id)
                  ? '#fcb603' : '#fff',
                borderColor: 
                  checkHighlight(note.id)
                  ? '#fff' : '#2b2b2b',
              }}
            >
              <Text style={styles.title}>
                {note.title}
              </Text>
              <Text style={styles.text}>
                {note.text.length > 84 ? note.text.slice(0, 84) : note.text}
              </Text>
            </View>
          </TouchableOpacity>
          ))}
        </View>
        <NoteView />
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: '#000',
  },
  scroll: {
    margin: 6,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  addNote: {
    fontSize: 50,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  addNoteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#fcb603',
  },
  card: {
    width: 170,
    height: 150,
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 10,
    alignContent: 'center',
    padding: 15,
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  }
});
