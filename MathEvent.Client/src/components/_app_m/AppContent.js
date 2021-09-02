import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Events from '../events_m';
import ModalRoot from '../_common/Modal/ModalRoot';
import routes from '../../utils/routes';

const AppContent = () => (
  <div>
    <Switch>
      <Route path="/" exact component={Events} />
      <Route path={routes.events.main} component={Events} />
    </Switch>
    <ModalRoot />
  </div>
);

export default AppContent;
