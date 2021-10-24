import { createAction } from '@reduxjs/toolkit';
import { setTheme } from '../../utils/local-storage-manager';

export const setHeader = createAction(
  'setHeader',
  (header) => ({ payload: { header } }),
);
export const setIsDarkTheme = createAction(
  'setIsDarkTheme',
  (isDarkTheme) => {
    setTheme(isDarkTheme);

    return { payload: { isDarkTheme } };
  },
);
