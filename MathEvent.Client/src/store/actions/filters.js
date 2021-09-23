import { createAction } from '@reduxjs/toolkit';

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
