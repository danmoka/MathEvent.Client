import { createSlice } from '@reduxjs/toolkit';
import {
  setIsCalendarOpened,
  setIsFilterOpened,
  setIsSortOpened,
} from '../actions/filters';

const initialState = {
  isFilterOpened: false,
  isSortOpened: false,
  isCalendarOpened: false,
};

const filtersSlice = createSlice({
  name: 'filtersSlice',
  initialState,
  extraReducers: {
    [setIsFilterOpened]: (state, { payload: { isFilterOpened } }) => {
      const st = state;
      st.isFilterOpened = isFilterOpened;
    },
    [setIsSortOpened]: (state, { payload: { isSortOpened } }) => {
      const st = state;
      st.isSortOpened = isSortOpened;
    },
    [setIsCalendarOpened]: (state, { payload: { isCalendarOpened } }) => {
      const st = state;
      st.isCalendarOpened = isCalendarOpened;
    },
  },
});

export default filtersSlice.reducer;
