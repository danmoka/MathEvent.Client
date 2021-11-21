/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTokens,
  fetchAccount,
  fetchUserAccount,
  logout,
  revocation,
  patchUserAccount,
} from '../actions/account';
import { getAccessToken } from '../../utils/local-storage-manager';

const initialState = {
  account: null,
  userAccount: null,
  hasToken: Boolean(getAccessToken()),
  isAuthenticated: false,
  isFetchingAccount: false,
  isFetchingUserAccount: false,
  hasError: false,
};

const accountSlice = createSlice({
  name: 'accountSlice',
  initialState,
  extraReducers: {
    [fetchTokens.fulfilled]: (state, { payload: { hasToken, hasError } }) => {
      state.isFetchingAccount = false;
      state.hasError = hasError;

      if (!hasError) {
        state.hasToken = hasToken;
      }
    },
    [fetchTokens.pending]: (state) => {
      state.isFetchingAccount = true;
    },
    [fetchTokens.rejected]: (state) => {
      state.isFetchingAccount = false;
      state.hasError = true;
      state.hasToken = false;
    },

    [fetchAccount.fulfilled]: (state, {
      payload: { account, isAuthenticated, hasError },
    }) => {
      state.isFetchingAccount = false;
      state.hasError = hasError;

      if (!hasError) {
        state.account = account;
        state.isAuthenticated = isAuthenticated;
      }
    },
    [fetchAccount.pending]: (state) => {
      state.isFetchingAccount = true;
    },
    [fetchAccount.rejected]: (state) => {
      state.isFetchingAccount = false;
      state.hasError = true;
      state.account = null;
      state.isAuthenticated = false;
    },

    [logout.fulfilled]: (state) => {
      state.isFetchingAccount = false;
      state.hasError = false;
      state.account = null;
      state.userAccount = null;
      state.hasToken = false;
      state.isAuthenticated = false;
    },

    [revocation.fulfilled]: (state, { payload: { hasError } }) => {
      state.isFetchingAccount = false;
      state.hasError = hasError;
    },
    [revocation.pending]: (state) => {
      state.isFetchingAccount = true;
    },
    [revocation.rejected]: (state) => {
      state.isFetchingAccount = false;
      state.hasError = true;
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
  },
});

export default accountSlice.reducer;
