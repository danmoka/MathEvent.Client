import { createSlice } from '@reduxjs/toolkit';
import {
  setIsCalendarOpened,
  setIsFilterOpened,
  setIsSortOpened,
  setOrganizationFilter,
  setStartDateFromFilter,
  setStartDateToFilter,
} from '../actions/filters';

const initialState = {
  isFilterOpened: false,
  isSortOpened: false,
  isCalendarOpened: false,
  organizationId: '',
  startDateFrom: null,
  startDateTo: null,
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
    [setStartDateFromFilter]: (state, { payload: { startDateFrom } }) => {
      const st = state;
      st.startDateFrom = startDateFrom;
    },
    [setStartDateToFilter]: (state, { payload: { startDateTo } }) => {
      const st = state;
      st.startDateTo = startDateTo;
    },
  },
});

export default filtersSlice.reducer;
