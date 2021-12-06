import { createSlice } from '@reduxjs/toolkit';
import {
  onPendingSortByValues,
  onFulfilledSortByValues,
  onRejectedSortByValues,
} from './defaults';
import {
  fetchSortByValues,
  selectSortByValue,
  setEventSearch,
  setIsCalendarOpened,
  setIsFilterOpened,
  setIsSortOpened,
  setOrganizationFilter,
  setOrganizationSearch,
  setParentId,
  setStartDateFromFilter,
  setStartDateToFilter,
  setUserSearch,
} from '../actions/filters';

const initialState = {
  eventSearch: '',
  organizationSearch: '',
  userSearch: '',
  parentId: null,
  isFilterOpened: false,
  isSortOpened: false,
  isCalendarOpened: false,
  organizationId: null,
  startDateFrom: null,
  startDateTo: null,
  sortByValues: [],
  isFetchingSortByValues: false,
  selectedSortByValue: '0',
};

const filtersSlice = createSlice({
  name: 'filtersSlice',
  initialState,
  extraReducers: {
    [setUserSearch]: (state, { payload: { searchString } }) => {
      const st = state;
      st.userSearch = searchString;
    },
    [setOrganizationSearch]: (state, { payload: { searchString } }) => {
      const st = state;
      st.organizationSearch = searchString;
    },
    [setEventSearch]: (state, { payload: { searchString } }) => {
      const st = state;
      st.eventSearch = searchString;
    },
    [setParentId]: (state, { payload: { parentId } }) => {
      const st = state;
      st.parentId = parentId;
    },
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

    [fetchSortByValues.pending]: (state) => {
      const st = state;
      onPendingSortByValues(st);
    },
    [fetchSortByValues.fulfilled]: (state, {
      payload: { sortByValues, hasError },
    }) => {
      const st = state;
      onFulfilledSortByValues(st, hasError);

      if (!hasError) {
        st.sortByValues = sortByValues;
      }
    },
    [fetchSortByValues.rejected]: (state) => {
      const st = state;
      onRejectedSortByValues(st);
      st.sortByValues = [];
      st.selectedSortByValue = null;
    },

    [selectSortByValue]: (state, { payload: { sortByValue } }) => {
      const st = state;
      st.selectedSortByValue = sortByValue;
    },
  },
});

export default filtersSlice.reducer;
