import api from '../api';
import { accountBaseService, baseService } from './base-service';

const accountService = {
  token: async (data) => {
    const url = api.account.token();

    return accountBaseService.post(url, data);
  },
  account: async () => {
    const url = api.account.account();

    return baseService.get(url);
  },
  revocation: async (data) => {
    const url = api.account.revocation();

    return accountBaseService.post(url, data);
  },
  register: async (credentials) => {
    const url = api.account.register();

    return baseService.post(url, credentials);
  },
  forgotPassword: async (emailData) => {
    const url = api.account.forgotPassword();

    return baseService.post(url, emailData);
  },
  forgotPasswordReset: async (passwordData) => {
    const url = api.account.forgotPasswordReset();

    return baseService.post(url, passwordData);
  },
  fetchUserAccount: async (id) => {
    const url = api.account.fetchUserAccount(id);

    return baseService.get(url);
  },
  patchUserAccount: async (id, data) => {
    const url = api.account.patchUserAccount(id);

    return baseService.patch(url, data);
  },
};

export default accountService;
