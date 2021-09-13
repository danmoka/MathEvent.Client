import React from 'react';
import { IconButton, iconTypes } from '../../_common/Icon';
import EventsSearch from './EventsSearch';
import EventsCollection from './EventsCollection';
import { useTitle } from '../../../hooks';
import './EventsView.scss';
import EventsFilters from './EventsFilters';
import EventsSort from './EventsSort';
import EventsCalendar from './EventsCalendar';

const EventView = () => {
  useTitle('События');

  return (
    <div>
      <div className="events-view__search-section">
        <EventsSearch />
        <div className="events-view__search-section__buttons">
          <IconButton
            type={iconTypes.sort}
            title="Сортировать"
          />
          <IconButton
            type={iconTypes.filter}
            title="Фильтровать"
          />
          <IconButton
            type={iconTypes.calendar}
            title="Календарь"
          />
          <IconButton
            type={iconTypes.add}
            title="Новое событие"
          />
        </div>
      </div>
      <div className="events-view__filters-section">
        <EventsSort />
      </div>
      <div className="events-view__filters-section">
        <EventsFilters />
      </div>
      <div className="events-view__calendar-section">
        <EventsCalendar />
      </div>
      <div className="events-view__collection-section">
        <EventsCollection />
      </div>
    </div>
  );
};

export default EventView;
