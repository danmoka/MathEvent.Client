import { createSlice } from '@reduxjs/toolkit';
import { getTheme } from '../../utils/local-storage-manager';
import {
  setAlertMessage,
  setAlertSeverity,
  setHeader,
  setIsDarkTheme,
} from '../actions/app';

const initialState = {
  header: 'MathEvent',
  isDarkTheme: getTheme() === 'true',
  alertMessage: '',
  alertSeverity: 'warning',
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  extraReducers: {
    [setHeader]: (state, { payload: { header } }) => {
      state.header = header;
    },
    [setAlertMessage]: (state, { payload: { message } }) => {
      state.alertMessage = message;
    },
    [setAlertSeverity]: (state, { payload: { severity } }) => {
      state.alertSeverity = severity;
    },
    [setIsDarkTheme]: (state, { payload: { isDarkTheme } }) => {
      state.isDarkTheme = isDarkTheme;
    },
  },
});

export default appSlice.reducer;
