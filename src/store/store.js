import { configureStore } from '@reduxjs/toolkit'
import notesReducer from '../features/notes';
import persistStore from 'redux-persist/es/persistStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { combineReducers } from '@reduxjs/toolkit';
import selectedNoteReducer from '../features/selectedNote';
import selectViewReducer from '../features/selectView';
import thunk from 'redux-thunk';


const userPersistConfig = {
  key: 'notes',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  notes: persistReducer(userPersistConfig, notesReducer),
  selectedNote: selectedNoteReducer,
  selectView: selectViewReducer,
});


export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)