import React, { useCallback } from 'react';
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

const EventView = () => {
  useTitle('События');

  const dispatch = useDispatch();
  const {
    isFilterOpened,
    isSortOpened,
    isCalendarOpened,
  } = useSelector((state) => state.filters);

  const handleFiltersButtonClick = useCallback(() => {
    dispatch(setIsFilterOpened(!isFilterOpened));
  }, [dispatch, isFilterOpened]);

  const handleSortButtonClick = useCallback(() => {
    dispatch(setIsSortOpened(!isSortOpened));
  }, [dispatch, isSortOpened]);

  const handleCalendarButtonClick = useCallback(() => {
    dispatch(setIsCalendarOpened(!isCalendarOpened));
  }, [dispatch, isCalendarOpened]);

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
