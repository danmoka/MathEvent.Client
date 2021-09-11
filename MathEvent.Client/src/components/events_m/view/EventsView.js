import React from 'react';
import { useTitle } from '../../../hooks';
import EventsFilter from './EventsFilter';
import EventsCollection from './EventsCollection';

const EventView = () => {
  useTitle('События');

  return (
    <div>
      <EventsFilter />
      <EventsCollection />
    </div>
  );
};

export default EventView;
