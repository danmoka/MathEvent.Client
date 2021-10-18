import api from '../api';
import { baseService } from './base-service';

const userService = {
  fetchUsers: async () => {
    const url = api.users.fetchUsers();
    const response = await baseService.get(url);

    return response;
  },
  fetchUser: async (userId) => {
    const url = api.users.fetchUser(userId);
    const response = await baseService.get(url);

    return response;
  },
  patchUser: async (userId, data) => {
    const url = api.users.patchUser(userId);
    const response = await baseService.patch(url, data);

    return response;
  },
  register: async (credentials) => {
    const url = api.users.register();
    const response = await baseService.post(url, credentials);

    return response;
  },
  forgotPassword: async (emailData) => {
    const url = api.users.forgotPassword();
    const response = await baseService.post(url, emailData);

    return response;
  },
  forgotPasswordReset: async (passwordData) => {
    const url = api.users.forgotPasswordReset();
    const response = await baseService.post(url, passwordData);

    return response;
  },
  fetchStatistics: async (activeUsersTop) => {
    const url = api.users.fetchStatistics(activeUsersTop);
    const response = await baseService.get(url);

    return response;
  },
  fetchUserStatistics: async (userId) => {
    const url = api.users.fetchUserStatistics(userId);
    const response = await baseService.get(url);

    return response;
  },
};

export default userService;
