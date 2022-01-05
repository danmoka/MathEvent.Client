/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUsers,
  fetchOrCreateUserInfo,
  patchUserInfo,
  fetchUserAccount,
  patchUserAccount,
  fetchStatistics,
  fetchUserStatistics,
  createUserInfo,
  clearUserInfo,
  fetchUserInfo,
  addUserAccountToRole,
  removeUserAccountFromRole,
} from '../actions/user';

const initialState = {
  users: [],
  userAccount: undefined,
  userInfo: undefined,
  statistics: [],
  userStatistics: [],
  isFetchingUserAccount: false,
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

    [fetchOrCreateUserInfo.fulfilled]: (state,
      { payload: { userInfo, hasError } }) => {
      state.isFetchingUserInfo = false;
      state.hasError = hasError;

      if (!hasError) {
        state.userInfo = userInfo;
      }
    },
    [fetchOrCreateUserInfo.pending]: (state) => {
      state.isFetchingUserInfo = true;
    },
    [fetchOrCreateUserInfo.rejected]: (state) => {
      state.isFetchingUserInfo = false;
      state.hasError = true;
      state.userInfo = null;
    },

    [fetchUserInfo.fulfilled]: (state,
      { payload: { userInfo, hasError } }) => {
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
      state.userAccount = null;
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

    [fetchUserAccount.fulfilled]: (state, {
      payload: { userAccount, hasError },
    }) => {
      state.isFetchingUserAccount = false;
      state.hasError = hasError;

      if (!hasError) {
        state.userAccount = userAccount;
      }
    },
    [fetchUserAccount.pending]: (state) => {
      state.isFetchingUserAccount = true;
    },
    [fetchUserAccount.rejected]: (state) => {
      state.isFetchingUserAccount = false;
      state.hasError = true;
      state.userAccount = null;
    },

    [patchUserAccount.fulfilled]: (state, {
      payload: { userAccount, hasError },
    }) => {
      state.isFetchingUserAccount = false;
      state.hasError = hasError;

      if (!hasError) {
        state.userAccount = userAccount;
      }
    },
    [patchUserAccount.pending]: (state) => {
      state.isFetchingUserAccount = true;
    },
    [patchUserAccount.rejected]: (state) => {
      state.isFetchingUserAccount = false;
      state.hasError = true;
      state.userAccount = null;
    },

    [addUserAccountToRole.fulfilled]: (state, {
      payload: { userAccount, hasError },
    }) => {
      state.isFetchingUserAccount = false;
      state.hasError = hasError;

      if (!hasError) {
        state.userAccount = userAccount;
      }
    },
    [addUserAccountToRole.pending]: (state) => {
      state.isFetchingUserAccount = true;
    },
    [addUserAccountToRole.rejected]: (state) => {
      state.isFetchingUserAccount = false;
      state.hasError = true;
      state.userAccount = null;
    },

    [removeUserAccountFromRole.fulfilled]: (state, {
      payload: { userAccount, hasError },
    }) => {
      state.isFetchingUserAccount = false;
      state.hasError = hasError;

      if (!hasError) {
        state.userAccount = userAccount;
      }
    },
    [removeUserAccountFromRole.pending]: (state) => {
      state.isFetchingUserAccount = true;
    },
    [removeUserAccountFromRole.rejected]: (state) => {
      state.isFetchingUserAccount = false;
      state.hasError = true;
      state.userAccount = null;
    },
  },
});

export default userSlice.reducer;
