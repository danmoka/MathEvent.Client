import { createSlice } from '@reduxjs/toolkit';
import { setHeader, setIsDarkTheme } from '../actions/app';

const initialState = {
  header: 'MathEvent',
  isDarkTheme: false,
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  extraReducers: {
    [setHeader]: (state, { payload: { header } }) => {
      state.header = header;
    },
    [setIsDarkTheme]: (state, { payload: { isDarkTheme } }) => {
      state.isDarkTheme = isDarkTheme;
    },
  },
});

export default appSlice.reducer;
