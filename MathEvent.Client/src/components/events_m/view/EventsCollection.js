import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import Loader from '../../_common/Loader';
import CardCollection from '../../_common/CardCollection';
import EventsBreadcrumbs from './EventsBreadcrumbs';
import { getImageSrc } from '../../../utils/get-image-src';
import { iconTypes } from '../../_common/Icon';
import images from '../../../constants/images';
import './EventsView.scss';

const prepareDateTime = (dateTime) => {
  moment.locale('ru');
  const preparedDateTime = moment(dateTime).format('LL');

  return preparedDateTime;
};

const prepareImage = (path, isDarkTheme) => {
  if (path) {
    return getImageSrc(path);
  }
  if (isDarkTheme) {
    return images.eventDefaultDark;
  }

  return images.eventDefault;
};

const prepareEvents = (
  events,
  selectedEvent,
  onClick,
  isDarkTheme,
) => events.map((event, index) => ({
  id: event.id,
  primaryText: event.name,
  secondaryText: prepareDateTime(event.startDate),
  additionalInfo: event.description,
  image: prepareImage(event.avatarPath, isDarkTheme),
  isSelected: selectedEvent && event.id === selectedEvent.id,
  index: index + 1,
  onClick: () => onClick(event),
}));

const EventsCollection = () => {
  const dispatch = useDispatch();
  const { events, selectedEvent, isFetchingEvents } = useSelector(
    (state) => state.event,
  );
  const { isDarkTheme } = useSelector((state) => state.app);

  const handleEventClick = useCallback(() => {
    console.log('clicked...');
  }, []);

  const preparedEvents = prepareEvents(
    events,
    selectedEvent,
    handleEventClick,
    isDarkTheme,
  );

  return (
    <div className="events-collection">
      <EventsBreadcrumbs />
      {isFetchingEvents ? (
        <div className="events-collection__loader-section">
          <Loader />
        </div>

      ) : (
        <CardCollection items={preparedEvents} />
      )}
    </div>
  );
};

export default EventsCollection;
