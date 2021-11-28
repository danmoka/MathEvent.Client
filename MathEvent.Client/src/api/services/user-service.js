import api from '../api';
import { baseService } from './base-service';

const userService = {
  fetchUsers: async () => {
    const url = api.users.fetchUsers();

    return baseService.get(url);
  },
  fetchUserInfo: async (identityId) => {
    const url = api.users.fetchUserInfo(identityId);

    return baseService.get(url);
  },
  createUserInfo: async (data) => {
    const url = api.users.createUserInfo();

    return baseService.post(url, data);
  },
  patchUserInfo: async (identityId, data) => {
    const url = api.users.patchUserInfo(identityId);

    return baseService.patch(url, data);
  },
  fetchUserAccount: async (identityId) => {
    const url = api.users.fetchUserAccount(identityId);

    return baseService.get(url);
  },
  patchUserAccount: async (identityId, data) => {
    const url = api.users.patchUserAccount(identityId);

    return baseService.patch(url, data);
  },
  fetchStatistics: async (activeUsersTop) => {
    const url = api.users.fetchStatistics(activeUsersTop);

    return baseService.get(url);
  },
  fetchUserStatistics: async (identityId) => {
    const url = api.users.fetchUserStatistics(identityId);

    return baseService.get(url);
  },
};

export default userService;
