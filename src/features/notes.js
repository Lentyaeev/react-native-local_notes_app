import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.value.push(action.payload);
    },
    clearNotes: (state) => {
      state.value = [];
    },
    editNote: (state, action) => {
      state.value = [...state.value].map(note => {
        if (note.id === action.payload.id) {
          return action.payload;
        } else {
          return note;
        }
      });
    },
    deleteNotes: (state, action) => {
      state.value = state.value.filter(note => {
        if (action.payload.some(id => id === note.id)) {
          return false;
        } else {
          return true;
        }
      })
    }
  },
})

// Action creators are generated for each case reducer function
export const { addNote, clearNotes, editNote, deleteNotes } = notesSlice.actions

export default notesSlice.reducer;

