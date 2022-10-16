import { useEffect, useState } from 'react';
import { StyleSheet, Modal, KeyboardAvoidingView, TextInput, TouchableOpacity, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addNote, editNote } from '../features/notes';
import { setSelectedNote } from '../features/selectedNote';

export default function NoteView() {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const selectedNote = useSelector((state) => state.selectedNote.value);
  const notes = useSelector((state) => state.notes.value);

  useEffect(() => {
    if (notes.some(note => note.id === selectedNote)) {
      const note = notes.find(note => note.id === selectedNote);
      setTitle(note.title);
      setText(note.text);
    }
  }, [selectedNote])

  const save = () => {
    if (!text || !title) {
      dispatch(setSelectedNote(null));
      setText('');
      setTitle('');
      return;
    }
    if (!notes.some(note => note.id === selectedNote)) {
      dispatch(addNote(createNote(title, text)));
    } else {
      const copyNote = {...notes.find(note => note.id === selectedNote)};
      copyNote.text = text.trim();
      copyNote.title = title.trim();
      dispatch(editNote(copyNote));
    }
    dispatch(setSelectedNote(null));
    setText('');
    setTitle('');
  }

  return (
    <Modal
      onRequestClose={save}
      animationType='slide'
      visible={selectedNote !== null}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={save}>
          <Text style={styles.back}>
            {'< Notes'}
          </Text>
        </TouchableOpacity>
        <TextInput
          autoFocus
          maxLength={22}
          cursorColor='#fcb603'
          value={title}
          onChangeText={setTitle}
          style={styles.titleInput}
          placeholder='Title'
        />
          <TextInput
            multiline
            cursorColor='#fcb603'
            value={text}
            onChangeText={setText}
            style={styles.input}
            placeholder='start typing'
          />
      </KeyboardAvoidingView>
    </Modal>
  )
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 20,
    paddingHorizontal: 20,
  },
  container:{
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  back: {
    color: '#fcb603',
    fontSize: 20,
    fontWeight: '700',
    paddingBottom: 10,
  },
  titleInput: {
    fontSize: 26,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingBottom: 10,
  }
});

const createNote = (title, text) => {
  return {
    id: Date.now(),
    title: title,
    text: text,
  }
};