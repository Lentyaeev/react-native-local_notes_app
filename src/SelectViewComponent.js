import { useEffect, useState } from 'react';
import { 
  Text,
  StyleSheet,
  ScrollView, 
  View, 
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import NoteView from './components/NoteView';
import { deleteNotes } from './features/notes';
import { setSelectedId, setSelectView } from './features/selectView';

export const SelectViewComponent = () => {
  const notes = useSelector((state) => state.notes.value);
  const selectedInitial = useSelector((state) => state.selectView.id);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const dispatch = useDispatch();

  const checkHighlight = (noteId) => {
    return selectedNotes.some(id => id === noteId);
  }
  
  useEffect(() => {
    setSelectedNotes([selectedInitial]);
    console.log(selectedNotes);
  }, []);


  return (
    <View style={styles.main}>
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
              onLongPress={() => dispatch(setSelectView(true))}
              onPress={() => setSelectedNotes(prev => {
                if (prev && prev.some(id => id === note.id)) {
                  return prev.filter(id => id !== note.id);
                }
                return [...prev, note.id];
              })}
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
    </View>
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
