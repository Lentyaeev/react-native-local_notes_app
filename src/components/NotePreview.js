import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setSelectedNote } from '../features/selectedNote';
import { setSelectedId } from '../features/selectView';

export default function NotePreview({id, title, text}) {
  const dispatch = useDispatch();
  
  return (
    <TouchableOpacity
      onLongPress={() => dispatch(setSelectedId(id))}
      onPress={() => dispatch(setSelectedNote(id))}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.text}>
          {text.length > 84 ? text.slice(0, 84) : text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 170,
    height: 150,
    flex: 1,
    borderColor: '#2b2b2b',
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
})
