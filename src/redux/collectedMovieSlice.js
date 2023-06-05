import { createSlice } from '@reduxjs/toolkit';

const collectedMoviesSlice = createSlice({
  name: 'collection',
  initialState: [],
  reducers: {
    add(state, action) {
      state.push(action.payload);
      // return [...state, action.payload]
    },
    remove(state, action) {
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const collectionReducer = collectedMoviesSlice.reducer;
export const { add, remove } = collectedMoviesSlice.actions;