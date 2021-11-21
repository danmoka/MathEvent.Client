/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUsers,
  fetchUserInfo,
  patchUserInfo,
  fetchStatistics,
  fetchUserStatistics,
  createUserInfo,
  clearUserInfo,
} from '../actions/user';

const initialState = {
  users: [],
  userInfo: undefined,
  statistics: [],
  userStatistics: [],
  isFetchingUserInfo: false,
  isFetchingUsers: false,
  isFetchingUserStatistics: false,
  isFetchingUsersStatistics: false,
  hasError: false,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  extraReducers: {
    [fetchUsers.fulfilled]: (state, { payload: { users, hasError } }) => {
      state.isFetchingUsers = false;
      state.hasError = hasError;

      if (!hasError) {
        state.users = users;
      }
    },
    [fetchUsers.pending]: (state) => {
      state.isFetchingUsers = true;
    },
    [fetchUsers.rejected]: (state) => {
      state.isFetchingUsers = false;
      state.hasError = true;
      state.users = [];
    },

    [fetchUserInfo.fulfilled]: (state, { payload: { userInfo, hasError } }) => {
      state.isFetchingUserInfo = false;
      state.hasError = hasError;

      if (!hasError) {
        state.userInfo = userInfo;
      }
    },
    [fetchUserInfo.pending]: (state) => {
      state.isFetchingUserInfo = true;
    },
    [fetchUserInfo.rejected]: (state) => {
      state.isFetchingUserInfo = false;
      state.hasError = true;
      state.userInfo = null;
    },

    [patchUserInfo.fulfilled]: (state, { payload: { userInfo, hasError } }) => {
      state.isFetchingUserInfo = false;
      state.hasError = hasError;

      if (!hasError) {
        state.userInfo = userInfo;
      }
    },
    [patchUserInfo.pending]: (state) => {
      state.isFetchingUserInfo = true;
    },
    [patchUserInfo.rejected]: (state) => {
      state.isFetchingUserInfo = false;
      state.hasError = true;
      state.userInfo = null;
    },

    [createUserInfo.fulfilled]: (state,
      {
        payload: {
          userInfo,
          hasError,
        },
      }) => {
      state.isFetchingUserInfo = false;
      state.hasError = hasError;

      if (!hasError) {
        state.userInfo = userInfo;
      }
    },
    [createUserInfo.pending]: (state) => {
      state.isFetchingUserInfo = true;
    },
    [createUserInfo.rejected]: (state) => {
      state.isFetchingUserInfo = false;
      state.hasError = true;
      state.userInfo = null;
    },

    [clearUserInfo]: (state) => {
      state.userInfo = null;
    },

    [fetchStatistics.fulfilled]: (
      state,
      { payload: { statistics, hasError } },
    ) => {
      state.isFetchingUsersStatistics = false;
      state.hasError = hasError;

      if (!hasError) {
        state.statistics = statistics;
      }
    },
    [fetchStatistics.pending]: (state) => {
      state.isFetchingUsersStatistics = true;
    },
    [fetchStatistics.rejected]: (state) => {
      state.isFetchingUsersStatistics = false;
      state.hasError = true;
      state.statistics = [];
    },

    [fetchUserStatistics.fulfilled]: (
      state,
      { payload: { statistics, hasError } },
    ) => {
      state.isFetchingUserStatistics = false;
      state.hasError = hasError;

      if (!hasError) {
        state.userStatistics = statistics;
      }
    },
    [fetchUserStatistics.pending]: (state) => {
      state.isFetchingUserStatistics = true;
    },
    [fetchUserStatistics.rejected]: (state) => {
      state.isFetchingUserStatistics = false;
      state.hasError = true;
      state.statistics = [];
    },
  },
});

export default userSlice.reducer;
