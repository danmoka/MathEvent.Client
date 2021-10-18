const routes = {
  home: '/home',
  account: {
    login: '/login',
    register: '/register',
    forgotPassword: '/forgotpassword',
    forgotPasswordReset: (email) => `/resetpassword/${email}`,
  },
  events: {
    main: '/events',
    event: (eventId) => `/events/${eventId}`,
    edit: (eventId) => `/events/${eventId}/edit`,
  },
  organizations: {
    main: '/organizations',
  },
  statistics: {
    main: '/statistics',
    events: '/statistics/event',
    organizations: '/statistics/organization',
    users: '/statistics/user',
  },
  users: {
    main: '/users',
    edit: (userId) => `/users/${userId}/edit`,
  },
};

export default routes;
