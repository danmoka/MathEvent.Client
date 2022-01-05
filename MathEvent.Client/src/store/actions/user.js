import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { showModal } from './modal';
import modalTypes from '../../constants/modal-types';
import userService from '../../api/services/user-service';
import { fetchAccount } from './account';
import statusCode from '../../utils/status-code-reader';

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
  async (newUser) => {
    const response = await userService.createUserInfo(newUser);

    if (statusCode(response).created) {
      const userInfo = await response.json();

      return { userInfo, hasError: false };
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
  async (identityUserId) => {
    const response = await userService.fetchUserInfo(identityUserId);

    if (statusCode(response).ok) {
      const userInfo = await response.json();

      return { userInfo, hasError: false };
    }

    return { userInfo: null, hasError: true };
  },
);

export const patchUserInfo = createAsyncThunk(
  'patchUserInfo',
  async ({ identityUserId, data }) => {
    const response = await userService.patchUserInfo(identityUserId, data);

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
  async (identityUserId) => {
    const response = await userService.fetchUserStatistics(identityUserId);

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

export const showNotAuthenticated = createAsyncThunk(
  'showNotAuthenticated',
  async (params, thunkAPI) => {
    thunkAPI.dispatch(showModal(modalTypes.notAuthenticated));
  },
);

export const fetchUserAccount = createAsyncThunk(
  'fetchUserAccount',
  async (identityUserId) => {
    const response = await userService.fetchUserAccount(identityUserId);

    if (statusCode(response).ok) {
      const userAccount = await response.json();

      return { userAccount, hasError: false };
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

      return { userAccount, hasError: false };
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

      return { userAccount, hasError: false };
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

      return { userAccount, hasError: false };
    }

    return { userAccount: null, hasError: true };
  },
);
