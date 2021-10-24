const ACCESS_TOKEN = 'ACCESS_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';
const IS_DARK_THEME = 'IS_DARK_THEME';

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);
export const setAccessToken = (
  accessToken,
) => localStorage.setItem(ACCESS_TOKEN, accessToken);
export const clearAccessToken = () => localStorage.removeItem(ACCESS_TOKEN);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);
export const setRefreshToken = (
  refreshToken,
) => localStorage.setItem(REFRESH_TOKEN, refreshToken);
export const clearRefreshToken = () => localStorage.removeItem(REFRESH_TOKEN);
export const setTheme = (
  isDarkTheme,
) => localStorage.setItem(IS_DARK_THEME, isDarkTheme);
export const getTheme = () => localStorage.getItem(IS_DARK_THEME);
