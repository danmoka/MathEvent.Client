import routes from './routes';
import history from './history';

export const navigateToHome = () => history.push(routes.home);

export const navigateToLogin = () => history.push(routes.account.login);
export const navigateToRegister = () => history.push(routes.account.register);
export const navigateToForgotPassword = () => history.push(
  routes.account.forgotPassword,
);
export const navigateToForgotPasswordReset = (email) => history.push(
  routes.account.forgotPasswordReset(email),
);
export const navigateToUserEdit = (userId) => history.push(
  `${routes.users.edit(userId)}`,
);

export const navigateToEvents = () => history.push(routes.events.main);

export const navigateToEvent = (eventId) => history.push(
  `${routes.events.event(eventId)}`,
);
export const navigateToEventEdit = (eventId) => history.push(
  `${routes.events.edit(eventId)}`,
);

export const navigateToOrganizations = () => history.push(
  routes.organizations.main,
);

export const navigateToUsers = () => history.push(
  routes.users.main,
);

export const navigateToStatistics = () => history.push(
  routes.statistics.main,
);

export const navigateToEventsStatistics = () => history.push(
  routes.statistics.events,
);
export const navigateToOrganizationsStatistics = () => history.push(
  routes.statistics.organizations,
);
export const navigateToUsersStatistics = () => history.push(
  routes.statistics.users,
);
