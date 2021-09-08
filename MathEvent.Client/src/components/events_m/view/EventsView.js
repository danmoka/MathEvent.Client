import React from 'react';
import { useTitle } from '../../../hooks';
import EventsFilter from './EventsFilter';
import EventsList from './EventsList';

const EventView = () => {
  useTitle('События');

  return (
    <div>
      <EventsFilter />
      <EventsList />
    </div>
  );
};

export default EventView;
