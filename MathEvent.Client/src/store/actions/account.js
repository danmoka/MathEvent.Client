import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  navigateToForgotPasswordReset,
  navigateToLogin,
} from '../../utils/navigator';
import {
  clearAccessToken,
  clearRefreshToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../../utils/local-storage-manager';
import { hideModal, showModal } from './modal';
import accountService from '../../api/services/account-service';
import statusCode from '../../utils/status-code-reader';
import config from '../../config';
import modalTypes from '../../constants/modal-types';

export const fetchAccount = createAsyncThunk('fetchAccount', async () => {
  const response = await accountService.account();

  if (statusCode(response).ok) {
    const account = await response.json();

    return { account, isAuthenticated: true, hasError: false };
  }

  clearAccessToken();
  clearRefreshToken();

  return { account: null, isAuthenticated: false, hasError: false };
});

export const fetchTokens = createAsyncThunk(
  'fetchTokens',
  async ({ userName, password, successAction }) => {
    const refreshToken = getRefreshToken();
    let data = {
      client_id: config.clientId,
      client_secret: config.clientSecret,
    };

    if (userName && password) {
      data = {
        ...data,
        grant_type: config.passwordGrantType,
        userName,
        password,
      };
    } else if (refreshToken) {
      data = {
        ...data,
        grant_type: config.refreshGrantType,
        refresh_token: refreshToken,
      };
    } else {
      return {
        hasToken: false,
        hasError: false,
      };
    }

    const response = await accountService.token(data);

    if (statusCode(response).ok) {
      // eslint-disable-next-line camelcase
      const { access_token, refresh_token } = await response.json();
      setAccessToken(access_token);
      setRefreshToken(refresh_token);

      if (successAction) {
        successAction();
      }

      return {
        hasToken: true,
        hasError: false,
      };
    }

    clearAccessToken();
    clearRefreshToken();

    return {
      hasToken: false,
      hasError: true,
    };
  },
);

export const register = createAsyncThunk('register', async (credentials) => {
  const response = await accountService.register(credentials);

  if (statusCode(response).created) {
    navigateToLogin();
  }
});

export const forgotPassword = createAsyncThunk(
  'forgotPassword',
  async (emailData) => {
    const response = await accountService.forgotPassword(emailData);

    if (statusCode(response).ok) {
      const { email } = emailData;
      navigateToForgotPasswordReset(email);
    }
  },
);

export const forgotPasswordReset = createAsyncThunk(
  'forgotPasswordReset',
  async (passwordData) => {
    const response = await accountService.forgotPasswordReset(passwordData);

    if (statusCode(response).ok) {
      navigateToLogin();
    }
  },
);

export const logout = createAsyncThunk('logout', (params, thunkAPI) => {
  thunkAPI.dispatch(hideModal());
  clearAccessToken();
  clearRefreshToken();
});

export const showLogoutModal = createAsyncThunk(
  'showLogoutModal',
  (params, thunkAPI) => {
    thunkAPI.dispatch(showModal(modalTypes.logout));
  },
);

export const revocation = createAsyncThunk('revocation', async () => {
  const refreshToken = getRefreshToken();

  const data = {
    token: refreshToken,
    client_id: config.clientId,
    client_secret: config.clientSecret,
  };

  const response = await accountService.revocation(data);

  if (statusCode(response).ok) {
    return { hasError: false };
  }

  return { hasError: true };
});
