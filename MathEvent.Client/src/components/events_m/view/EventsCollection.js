import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import Loader from '../../_common/Loader';
import CardCollection from '../../_common/CardCollection';
import { NormalText } from '../../_common/Text/Text';
import EventsBreadcrumbs from './EventsBreadcrumbs';
import { prepareImage } from '../../../utils/get-image-src';
import { navigateToEvent } from '../../../utils/navigator';
import './EventsView.scss';
import colors from '../../../constants/colors';

const prepareDateTime = (dateTime) => {
  moment.locale('ru');
  const preparedDateTime = moment(dateTime).format('LL');

  return preparedDateTime;
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
  const { events, selectedEvent, isFetchingEvents } = useSelector(
    (state) => state.event,
  );
  const { isDarkTheme } = useSelector((state) => state.app);

  const handleEventClick = useCallback((event) => {
    navigateToEvent(event.id);
  }, []);

  const preparedEvents = useMemo(() => prepareEvents(
    events,
    selectedEvent,
    handleEventClick,
    isDarkTheme,
  ), [handleEventClick, events, isDarkTheme, selectedEvent]);

  return (
    <div className="events-collection">
      <EventsBreadcrumbs />
      {isFetchingEvents ? (
        <div className="events-collection__loader-section">
          <Loader />
        </div>
      ) : (
        <>
          { preparedEvents.length < 1
            ? (
              <NormalText
                className="events-collection__collection-info"
                color={colors.textSecondary}
              >
                Событий нет, попробуйте изменить фильтры или сортировку
              </NormalText>
            )
            : (
              <CardCollection items={preparedEvents} />
            )}
        </>
      )}
    </div>
  );
};

export default EventsCollection;
