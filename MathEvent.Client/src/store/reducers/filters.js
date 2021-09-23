import { createSlice } from '@reduxjs/toolkit';
import {
  setIsCalendarOpened,
  setIsFilterOpened,
  setIsSortOpened,
  setOrganizationFilter,
} from '../actions/filters';

const initialState = {
  isFilterOpened: false,
  isSortOpened: false,
  isCalendarOpened: false,
  organizationId: '',
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
    [setOrganizationFilter]: (state, { payload: { organizationId } }) => {
      const st = state;
      st.organizationId = organizationId;
    },
  },
});

export default filtersSlice.reducer;
