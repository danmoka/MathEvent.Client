import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import { iconTypes } from '../../_common/Icon';
import Loader from '../../_common/Loader';
import EventsBreadcrumbs from './EventsBreadcrumbs';
import './EventsView.scss';

const prepareEvents = (
  events,
  selectedEvent,
  onEventEdit,
  onEventDelete,
  onClick,
) => events.map((event, index) => ({
  id: event.id,
  primaryText: event.name,
  secondaryText: moment(event.startDate).format('LL'),
  isSelected: selectedEvent && event.id === selectedEvent.id,
  index: index + 1,
  onClick: () => onClick(event),
  actions: [
    {
      id: 'edit',
      label: 'Редактировать',
      icon: iconTypes.edit,
      onClick: () => onEventEdit(event),
    },
    {
      id: 'delete',
      label: 'Удалить',
      icon: iconTypes.delete,
      onClick: () => onEventDelete(event),
    },
  ],
}));

const EventsList = () => {
  const dispatch = useDispatch();
  const { events, selectedEvent, isFetchingEvents } = useSelector(
    (state) => state.event,
  );

  const handleEventClick = useCallback(() => {
    console.log('clicked...');
  }, []);

  const handleEventEdit = useCallback(() => {
    console.log('edit...');
  }, []);

  const handleEventDelete = useCallback(() => {
    console.log('delete...');
  }, []);

  const preparedEvents = prepareEvents(
    events,
    selectedEvent,
    handleEventEdit,
    handleEventDelete,
    handleEventClick,
  );

  return (
    <div>
      <EventsBreadcrumbs />
      {isFetchingEvents ? (
        <div className="events-list__loader-section">
          <Loader />
        </div>
      ) : (
        <div className="event-list">
          {/* <List className="event-list__ul" items={preparedEvents} /> */}
        </div>
      )}
    </div>
  );
};

export default EventsList;
