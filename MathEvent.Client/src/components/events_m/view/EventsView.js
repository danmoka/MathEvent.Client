import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, iconTypes } from '../../_common/Icon';
import EventsSearch from './EventsSearch';
import EventsCollection from './EventsCollection';
import { useTitle } from '../../../hooks';
import './EventsView.scss';
import EventsFilters from './EventsFilters';
import EventsSort from './EventsSort';
import EventsCalendar from './EventsCalendar';
import {
  setIsFilterOpened,
  setIsSortOpened,
  setIsCalendarOpened,
} from '../../../store/actions/filters';
import {
  fetchEvents,
  showCreateEventModal,
} from '../../../store/actions/event';

const EventView = () => {
  useTitle('События');

  const dispatch = useDispatch();
  const {
    isFilterOpened,
    isSortOpened,
    isCalendarOpened,
    organizationId,
    startDateFrom,
    startDateTo,
  } = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(fetchEvents({
      parentId: null,
      organizationId,
      startDateFrom: startDateFrom
        ? new Date(startDateFrom).toISOString()
        : null,
      startDateTo: startDateTo
        ? new Date(startDateTo).toISOString()
        : null,
    }));
  }, [dispatch, organizationId, startDateFrom, startDateTo]);

  const handleFiltersButtonClick = useCallback(() => {
    dispatch(setIsFilterOpened(!isFilterOpened));
  }, [dispatch, isFilterOpened]);

  const handleSortButtonClick = useCallback(() => {
    dispatch(setIsSortOpened(!isSortOpened));
  }, [dispatch, isSortOpened]);

  const handleCalendarButtonClick = useCallback(() => {
    dispatch(setIsCalendarOpened(!isCalendarOpened));
  }, [dispatch, isCalendarOpened]);

  const handleEventCreateButtonClick = useCallback(() => {
    dispatch(showCreateEventModal());
  }, [dispatch]);

  return (
    <div>
      <div className="events-view__search-section">
        <EventsSearch />
        <div className="events-view__search-section__buttons">
          <IconButton
            type={iconTypes.sort}
            title="Сортировать"
            selected={isSortOpened}
            onClick={handleSortButtonClick}
          />
          <IconButton
            type={iconTypes.filter}
            title="Фильтровать"
            selected={isFilterOpened}
            onClick={handleFiltersButtonClick}
          />
          <IconButton
            type={iconTypes.calendar}
            title="Календарь"
            selected={isCalendarOpened}
            onClick={handleCalendarButtonClick}
          />
          <IconButton
            type={iconTypes.add}
            title="Новое событие"
            onClick={handleEventCreateButtonClick}
          />
        </div>
      </div>
      {isSortOpened
        ? (
          <div className="events-view__filters-section">
            <EventsSort />
          </div>
        )
        : (
          <></>
        )}
      {isFilterOpened
        ? (
          <div className="events-view__filters-section">
            <EventsFilters />
          </div>
        )
        : (<></>)}
      {isCalendarOpened
        ? (
          <div className="events-view__calendar-section">
            <EventsCalendar />
          </div>
        )
        : (<></>)}
      <div className="events-view__collection-section">
        <EventsCollection />
      </div>
    </div>
  );
};

export default EventView;
