import { connectRouter } from 'connected-react-router';
import accountReducer from './reducers/account';
import appReducer from './reducers/app';
import eventReducer from './reducers/event';
import fileReducer from './reducers/file';
import filtersReducer from './reducers/filters';
import mapReducer from './reducers/map';
import modalReducer from './reducers/modal';
import organizationReducer from './reducers/organization';
import userReducer from './reducers/user';

const createRootReducer = (history) => ({
  account: accountReducer,
  app: appReducer,
  event: eventReducer,
  file: fileReducer,
  filters: filtersReducer,
  map: mapReducer,
  modal: modalReducer,
  organization: organizationReducer,
  router: connectRouter(history),
  user: userReducer,
});

export default createRootReducer;
