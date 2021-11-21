import { getRoute } from '../../utils/get-route';

const userRoutes = {
  fetchUsers: () => getRoute('users/'),
  fetchUserInfo: () => getRoute('users/me/'),
  patchUserInfo: () => getRoute('users/me/'),
  createUserInfo: () => getRoute('users/'),
  fetchStatistics: (
    activeUsersTop,
  ) => getRoute(`users/statistics/?activeUsersTop=${activeUsersTop}`),
  fetchUserStatistics: (userId) => getRoute(`users/statistics/${userId}`),
};

export default userRoutes;
