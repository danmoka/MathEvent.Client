import { getAccountRoute } from '../../utils/get-route';

const accountRoutes = {
  token: () => getAccountRoute('/connect/token'),
  revocation: () => getAccountRoute('/connect/revocation'),
  account: () => getAccountRoute('/connect/userinfo'),
  register: () => getAccountRoute(
    'api/MathEventIdentityUsers/',
  ),
  forgotPassword: () => getAccountRoute(
    'api/MathEventIdentityUsers/forgotPassword/',
  ),
  forgotPasswordReset: () => getAccountRoute(
    'api/MathEventIdentityUsers/resetPassword/',
  ),
};

export default accountRoutes;
