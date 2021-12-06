import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import eventService from '../../api/services/event-service';
import statusCode from '../../utils/status-code-reader';

export const setUserSearch = createAction(
  'setUserSearch',
  (searchString) => ({ payload: { searchString } }),
);

export const setOrganizationSearch = createAction(
  'setOrganizationSearch',
  (searchString) => ({ payload: { searchString } }),
);

export const setEventSearch = createAction(
  'setEventSearch',
  (searchString) => ({ payload: { searchString } }),
);

export const setParentId = createAction(
  'setParentId',
  (parentId) => ({ payload: { parentId } }),
);

export const setIsFilterOpened = createAction(
  'setIsFilterOpened',
  (isFilterOpened) => ({ payload: { isFilterOpened } }),
);

export const setIsSortOpened = createAction(
  'setIsSortOpened',
  (isSortOpened) => ({ payload: { isSortOpened } }),
);

export const setIsCalendarOpened = createAction(
  'setIsCalendarOpened',
  (isCalendarOpened) => ({ payload: { isCalendarOpened } }),
);

export const setOrganizationFilter = createAction(
  'setOrganizationFilter',
  (organizationId) => ({ payload: { organizationId } }),
);

export const setStartDateFromFilter = createAction(
  'setStartDateFromFilter',
  (startDateFrom) => ({ payload: { startDateFrom } }),
);

export const setStartDateToFilter = createAction(
  'setStartDateToFilter',
  (startDateTo) => ({ payload: { startDateTo } }),
);

export const fetchSortByValues = createAsyncThunk(
  'fetchSortByValues',
  async () => {
    const response = await eventService.fetchSortByValues();

    if (statusCode(response).ok) {
      const sortByValues = await response.json();

      return { sortByValues, hasError: false };
    }

    return { hasError: true };
  },
);

export const selectSortByValue = createAction(
  'selectSortByValue',
  (sortByValue) => ({ payload: { sortByValue } }),
);
