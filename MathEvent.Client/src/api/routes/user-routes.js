import { getRoute } from '../../utils/get-route';

const userRoutes = {
  fetchUsers: () => getRoute('users/'),
  fetchUser: (userId) => getRoute(`users/${userId}`),
  patchUser: (userId) => getRoute(`users/${userId}`),
  register: () => getRoute('users/'),
  forgotPassword: () => getRoute('users/forgotPassword/'),
  forgotPasswordReset: () => getRoute('users/resetPassword/'),
  fetchStatistics: (
    activeUsersTop,
  ) => getRoute(`users/statistics/?activeUsersTop=${activeUsersTop}`),
  fetchUserStatistics: (userId) => getRoute(`users/statistics/${userId}`),
};

export default userRoutes;
