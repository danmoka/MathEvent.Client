import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { showModal } from './modal';
import modalTypes from '../../constants/modal-types';
import userService from '../../api/services/user-service';
import statusCode from '../../utils/status-code-reader';

export const fetchUsers = createAsyncThunk('fecthUsers', async () => {
  const response = await userService.fetchUsers();

  if (statusCode(response).ok) {
    const users = await response.json();

    return { users, hasError: false };
  }

  return { users: [], hasError: true };
});

export const createUserInfo = createAsyncThunk(
  'createUserInfo',
  async (user) => {
    const response = await userService.createUserInfo(user);

    if (statusCode(response).created) {
      const userInfo = await response.json();

      return { userInfo, hasError: false };
    }

    return { userInfo: null, hasError: true };
  },
);

export const fetchUserInfo = createAsyncThunk(
  'fetchUserInfo',
  // eslint-disable-next-line camelcase
  async ({ sub, email, given_name }, thunkAPI) => {
    const response = await userService.fetchUserInfo();

    if (statusCode(response).ok) {
      const userInfo = await response.json();

      return { userInfo, hasError: false };
    }

    if (statusCode(response).notFound) {
      const [name, surname] = given_name.split(' ');
      const newUser = {
        id: sub,
        email,
        name,
        surname,
      };
      thunkAPI.dispatch(createUserInfo(newUser));
    }

    return { userInfo: null, hasError: true };
  },
);

export const patchUserInfo = createAsyncThunk(
  'patchUserInfo',
  async (data) => {
    const response = await userService.patchUserInfo(data);

    if (statusCode(response).ok) {
      const userInfo = await response.json();

      return { userInfo, hasError: false };
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
  async (userId) => {
    const response = await userService.fetchUserStatistics(userId);

    if (statusCode(response).ok) {
      const statistics = await response.json();

      return { statistics, hasError: false };
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
