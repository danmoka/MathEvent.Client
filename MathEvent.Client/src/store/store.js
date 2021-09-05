import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';
import history from '../utils/history';

const rootReducer = createRootReducer(history);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
    .concat(routerMiddleware(history)),
});

export default store;
