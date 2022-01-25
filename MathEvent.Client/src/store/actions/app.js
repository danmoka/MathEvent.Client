import { createAction } from '@reduxjs/toolkit';
import { setTheme } from '../../utils/local-storage-manager';

export const setHeader = createAction(
  'setHeader',
  (header) => ({ payload: { header } }),
);
export const setAlertMessage = createAction(
  'setAlertMessage',
  (message) => ({ payload: { message } }),
);
export const setAlertSeverity = createAction(
  'setAlertSeverity',
  (severity) => ({ payload: { severity } }),
);
export const setIsDarkTheme = createAction(
  'setIsDarkTheme',
  (isDarkTheme) => {
    setTheme(isDarkTheme);

    return { payload: { isDarkTheme } };
  },
);
