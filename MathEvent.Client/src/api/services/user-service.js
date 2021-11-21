import api from '../api';
import { baseService } from './base-service';

const userService = {
  fetchUsers: async () => {
    const url = api.users.fetchUsers();

    return baseService.get(url);
  },
  fetchUserInfo: async () => {
    const url = api.users.fetchUserInfo();

    return baseService.get(url);
  },
  createUserInfo: async (data) => {
    const url = api.users.createUserInfo();

    return baseService.post(url, data);
  },
  patchUserInfo: async (data) => {
    const url = api.users.patchUserInfo();

    return baseService.patch(url, data);
  },
  fetchStatistics: async (activeUsersTop) => {
    const url = api.users.fetchStatistics(activeUsersTop);

    return baseService.get(url);
  },
  fetchUserStatistics: async (userId) => {
    const url = api.users.fetchUserStatistics(userId);

    return baseService.get(url);
  },
};

export default userService;
