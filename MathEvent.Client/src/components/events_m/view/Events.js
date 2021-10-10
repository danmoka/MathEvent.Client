import React from 'react';
import { Route } from 'react-router-dom';
import EventsView from './EventsView';
import Event from './Event';
import routes from '../../../utils/routes';

const Events = () => (
  <>
    <Route
      path={routes.events.main}
      exact
      render={() => <EventsView />}
    />
    <Route
      path={`${routes.events.event(':id')}`}
      exact
      render={() => <Event />}
    />
    {/* <Route
      path={`${routes.events.edit(':id')}`}
      exact
      render={(props) => <EventEdit {...props} />}
    /> */}
  </>
);

export default Events;
