import { useEffect, useState, useRef } from 'react';
import { 
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Animated,
  PanResponder
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import NotePreview from './NotePreview';
import NoteView from './NoteView';
import { setSelectedNote } from '../features/selectedNote';

export const List = () => {
  const notes = useSelector((state) => state.notes.value);
  const dispatch = useDispatch();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const createNewNote = () => {
    const id = Date.now();
    const newNote = {
      id: id,
      title: '',
      text: '',
    };
    dispatch(setSelectedNote(id));
  };

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  useEffect(() => {
    fadeIn();
  }, []);

  return (
    <Animated.View style={{...styles.main, opacity: fadeAnim}}>
      <TouchableOpacity 
        style={styles.addNoteButton}
        onPress={createNewNote}
      >
        <Text 
          style={styles.addNote}
          adjustsFontSizeToFit
        >
          {'+'}
        </Text>
      </TouchableOpacity>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 10 }}>
        <View style={styles.row}>
          {notes.map(note => (
            <NotePreview 
              id={note.id}
              title={note.title}
              text={note.text}
              key={note.id}
            />
          ))}
        </View>
        <NoteView />
      </ScrollView>
    </Animated.View>
  );
}

export const styles = StyleSheet.create({
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
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5
  },
});
