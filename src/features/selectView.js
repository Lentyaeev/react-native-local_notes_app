import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
}

export const selectViewSlice = createSlice({
  name: 'selectedNote',
  initialState,
  reducers: {
    setSelectedId: (state, action) => {
      state.id = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSelectedId } = selectViewSlice.actions

export default selectViewSlice.reducer;

