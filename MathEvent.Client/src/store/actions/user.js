import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { showModal } from './modal';
import modalTypes from '../../constants/modal-types';
import userService from '../../api/services/user-service';
import { fetchAccount } from './account';
import statusCode from '../../utils/status-code-reader';
import { errorsToMessage } from '../../utils/validation/errorsToMessage';
import { setAlertMessage, setAlertSeverity } from './app';
import alertTypes from '../../constants/alert-types';

export const fetchUsers = createAsyncThunk(
  'fecthUsers',
  async ({ userSearch }) => {
    const response = await userService.fetchUsers(userSearch);

    if (statusCode(response).ok) {
      const users = await response.json();

      return { users, hasError: false };
    }

    return { users: [], hasError: true };
  },
);

export const createUserInfo = createAsyncThunk(
  'createUserInfo',
  async (newUser, thunkAPI) => {
    const response = await userService.createUserInfo(newUser);

    if (statusCode(response).created) {
      const userInfo = await response.json();

      return { userInfo, hasError: false };
    }

    if (statusCode(response).badRequest) {
      const errors = await response.json();
      const message = errorsToMessage(errors);
      thunkAPI.dispatch(setAlertMessage(message));
      thunkAPI.dispatch(setAlertSeverity(alertTypes.error));
    }

    return { userInfo: null, hasError: true };
  },
);

export const fetchOrCreateUserInfo = createAsyncThunk(
  'fetchOrCreateUserInfo',
  async ({
    identityUserId, email, name, surname,
  }, thunkAPI) => {
    const response = await userService.fetchUserInfo(identityUserId);

    if (statusCode(response).ok) {
      const userInfo = await response.json();

      return { userInfo, hasError: false };
    }

    if (statusCode(response).badRequest) {
      const errors = await response.json();
      const message = errorsToMessage(errors);
      thunkAPI.dispatch(setAlertMessage(message));
      thunkAPI.dispatch(setAlertSeverity(alertTypes.error));
    }

    if (statusCode(response).notFound) {
      const newUser = {
        identityUserId,
        email,
        name,
        surname,
      };
      thunkAPI.dispatch(createUserInfo(newUser));
    }

    return { userInfo: null, hasError: true };
  },
);

export const fetchUserInfo = createAsyncThunk(
  'fetchUserInfo',
  async (identityUserId, thunkAPI) => {
    const response = await userService.fetchUserInfo(identityUserId);

    if (statusCode(response).ok) {
      const userInfo = await response.json();

      return { userInfo, hasError: false };
    }

    if (statusCode(response).badRequest) {
      const errors = await response.json();
      const message = errorsToMessage(errors);
      thunkAPI.dispatch(setAlertMessage(message));
      thunkAPI.dispatch(setAlertSeverity(alertTypes.error));
    }

    return { userInfo: null, hasError: true };
  },
);

export const patchUserInfo = createAsyncThunk(
  'patchUserInfo',
  async ({ identityUserId, data }, thunkAPI) => {
    const response = await userService.patchUserInfo(identityUserId, data);

    if (statusCode(response).ok) {
      const userInfo = await response.json();
      thunkAPI.dispatch(setAlertMessage('Пользователь изменен'));
      thunkAPI.dispatch(setAlertSeverity(alertTypes.success));

      return { userInfo, hasError: false };
    }

    if (statusCode(response).badRequest) {
      const errors = await response.json();
      const message = errorsToMessage(errors);
      thunkAPI.dispatch(setAlertMessage(message));
      thunkAPI.dispatch(setAlertSeverity(alertTypes.error));
    }

    return { userInfo: null, hasError: true };
  },
);

export const clearUserInfo = createAction(
  'clearUserInfo',
  () => ({ payload: { } }),
);

export const fetchStatistics = createAsyncThunk(
  'fetchStatistics',
  async (activeUsersTop) => {
    const response = await userService.fetchStatistics(activeUsersTop);

    if (statusCode(response).ok) {
      const statistics = await response.json();

      return { statistics, hasError: false };
    }

    return { statistics: [], hasError: true };
  },
);

export const fetchUserStatistics = createAsyncThunk(
  'fetchUserStatistics',
  async (identityUserId, thunkAPI) => {
    const response = await userService.fetchUserStatistics(identityUserId);

    if (statusCode(response).ok) {
      const statistics = await response.json();

      return { statistics, hasError: false };
    }

    if (statusCode(response).badRequest) {
      const errors = await response.json();
      const message = errorsToMessage(errors);
      thunkAPI.dispatch(setAlertMessage(message));
      thunkAPI.dispatch(setAlertSeverity(alertTypes.error));
    }

    return { statistics: [], hasError: true };
  },
);

export const showUserStatistics = createAsyncThunk(
  'showUserStatistics',
  async ({ user }, thunkAPI) => {
    thunkAPI.dispatch(showModal(modalTypes.userStatistics, { user }));
  },
);

export const showNotAuthenticated = createAsyncThunk(
  'showNotAuthenticated',
  async (params, thunkAPI) => {
    thunkAPI.dispatch(showModal(modalTypes.notAuthenticated));
  },
);

export const fetchUserAccount = createAsyncThunk(
  'fetchUserAccount',
  async (identityUserId, thunkAPI) => {
    const response = await userService.fetchUserAccount(identityUserId);

    if (statusCode(response).ok) {
      const userAccount = await response.json();

      return { userAccount, hasError: false };
    }

    if (statusCode(response).badRequest) {
      const errors = await response.json();
      const message = errorsToMessage(errors);
      thunkAPI.dispatch(setAlertMessage(message));
      thunkAPI.dispatch(setAlertSeverity(alertTypes.error));
    }

    return { userAccount: null, hasError: true };
  },
);

export const patchUserAccount = createAsyncThunk(
  'patchUserAccount',
  async ({ identityUserId, data }, thunkAPI) => {
    const response = await userService.patchUserAccount(identityUserId, data);

    if (statusCode(response).ok) {
      const userAccount = await response.json();
      thunkAPI.dispatch(fetchAccount());
      thunkAPI.dispatch(setAlertMessage('Пользователь изменен'));
      thunkAPI.dispatch(setAlertSeverity(alertTypes.success));

      return { userAccount, hasError: false };
    }

    if (statusCode(response).badRequest) {
      const errors = await response.json();
      const message = errorsToMessage(errors);
      thunkAPI.dispatch(setAlertMessage(message));
      thunkAPI.dispatch(setAlertSeverity(alertTypes.error));
    }

    return { userAccount: null, hasError: true };
  },
);

export const addUserAccountToRole = createAsyncThunk(
  'addUserAccountToRole',
  async (data, thunkAPI) => {
    const response = await userService.addToRole(data);

    if (statusCode(response).ok) {
      const userAccount = await response.json();
      thunkAPI.dispatch(fetchAccount());
      thunkAPI.dispatch(setAlertMessage('Пользователь добавлен в роль'));
      thunkAPI.dispatch(setAlertSeverity(alertTypes.success));

      return { userAccount, hasError: false };
    }

    if (statusCode(response).badRequest) {
      const errors = await response.json();
      const message = errorsToMessage(errors);
      thunkAPI.dispatch(setAlertMessage(message));
      thunkAPI.dispatch(setAlertSeverity(alertTypes.error));
    }

    return { userAccount: null, hasError: true };
  },
);

export const removeUserAccountFromRole = createAsyncThunk(
  'removeUserAccountFromRole',
  async (data, thunkAPI) => {
    const response = await userService.removeFromRole(data);

    if (statusCode(response).ok) {
      const userAccount = await response.json();
      thunkAPI.dispatch(fetchAccount());
      thunkAPI.dispatch(setAlertMessage('Пользователь удален из роли'));
      thunkAPI.dispatch(setAlertSeverity(alertTypes.success));

      return { userAccount, hasError: false };
    }

    if (statusCode(response).badRequest) {
      const errors = await response.json();
      const message = errorsToMessage(errors);
      thunkAPI.dispatch(setAlertMessage(message));
      thunkAPI.dispatch(setAlertSeverity(alertTypes.error));
    }

    return { userAccount: null, hasError: true };
  },
);
