import urlJoin from 'url-join';

const serverUrl = process.env.REACT_APP_SERVER;
const identityServerUrl = process.env.REACT_APP_IDENTITY_SERVER;

export const getRoute = (route) => urlJoin(serverUrl, 'api', route);
export const getAccountRoute = (route) => urlJoin(identityServerUrl, route);
