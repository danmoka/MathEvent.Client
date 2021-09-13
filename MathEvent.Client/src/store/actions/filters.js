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
