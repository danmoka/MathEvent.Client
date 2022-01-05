import { getRoute, getAccountRoute } from '../../utils/get-route';

const userRoutes = {
  fetchUsers: (userSearch) => getRoute(`users/?search=${userSearch}`),
  fetchUserInfo: (identityId) => getRoute(`users/${identityId}`),
  patchUserInfo: (identityId) => getRoute(`users/${identityId}`),
  createUserInfo: () => getRoute('users/'),
  fetchUserAccount: (identityId) => getAccountRoute(
    `api/MathEventIdentityUsers/${identityId}`,
  ),
  patchUserAccount: (identityId) => getAccountRoute(
    `api/MathEventIdentityUsers/${identityId}`,
  ),
  addToRole: () => getAccountRoute('api/MathEventIdentityUsers/addToRole'),
  removeFromRole: (
  ) => getAccountRoute('api/MathEventIdentityUsers/removeFromRole'),
  fetchStatistics: (
    activeUsersTop,
  ) => getRoute(`users/statistics/?activeUsersTop=${activeUsersTop}`),
  fetchUserStatistics: (
    identityId,
  ) => getRoute(`users/statistics/${identityId}`),
};

export default userRoutes;
