import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Events from '../events_m';
import Login from '../account_m/Login';
import Register from '../account_m/Register';
import ForgotPassword from '../account_m/ForgotPassword';
import ForgotPasswordReset from '../account_m/ForgotPasswordReset';
import Users from '../users_m';
import Organizations from '../organizations';
import ModalRoot from '../_common/Modal/ModalRoot';
import routes from '../../utils/routes';

const AppContent = () => (
  <div>
    <Switch>
      <Route exact path="/" render={() => (<Redirect to="/events" />)} />
      <Route path={routes.events.main} component={Events} />
      <Route path={routes.account.login} component={Login} />
      <Route path={routes.account.register} component={Register} />
      <Route path={routes.account.forgotPassword} component={ForgotPassword} />
      <Route
        path={`${routes.account.forgotPasswordReset(':email')}`}
        exact
        render={() => <ForgotPasswordReset />}
      />
      <Route path={routes.users.main} component={Users} />
      <Route path={routes.organizations.main} component={Organizations} />
    </Switch>
    <ModalRoot />
  </div>
);

export default AppContent;
