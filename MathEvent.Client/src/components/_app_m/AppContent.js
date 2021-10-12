import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Events from '../events_m';
import Login from '../account_m/Login';
import ModalRoot from '../_common/Modal/ModalRoot';
import routes from '../../utils/routes';

const AppContent = () => (
  <div>
    <Switch>
      <Route exact path="/" render={() => (<Redirect to="/events" />)} />
      <Route path={routes.events.main} component={Events} />
      <Route path={routes.account.login} component={Login} />
    </Switch>
    <ModalRoot />
  </div>
);

export default AppContent;
