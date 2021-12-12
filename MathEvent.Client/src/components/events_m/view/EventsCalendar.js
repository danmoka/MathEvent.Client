import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Calendar from '../../_common/Calendar';
import Loader from '../../_common/Loader';
import {
  setParentId,
  setStartDateFromFilter,
  setStartDateToFilter,
} from '../../../store/actions/filters';
import { fetchEventsCountByDate } from '../../../store/actions/event';
import './EventsView.scss';

const shiftDate = (date, numDays) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
};

const prepareEvents = (events) => {
  const preparedEvents = [];

  try {
    Object.entries(events)
      .forEach(([key, value]) => preparedEvents.push({
        date: new Date(key),
        count: value,
      }));
  } catch {
    return [];
  }

  return preparedEvents;
};

const EventsCalendar = ({ startDate, endDate }) => {
  const dispatch = useDispatch();
  const {
    eventsCountByDate,
    isFetchingEventsCountByDate,
  } = useSelector((state) => state.event);
  const preparedEvents = prepareEvents(eventsCountByDate);

  const handleStartDateFromToFilterChange = useCallback((data) => {
    if (data) {
      const { date } = data;
      dispatch(setParentId(null));
      dispatch(setStartDateFromFilter(date));
      dispatch(setStartDateToFilter(shiftDate(date, 1)));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchEventsCountByDate({
      startDateFrom: startDate
        ? new Date(startDate).toISOString()
        : null,
      startDateTo: endDate
        ? new Date(endDate).toISOString()
        : null,
    }));
  }, [dispatch, endDate, startDate]);

  // TODO: календарь работает только с событиями, parentId которых равен null.
  // это проблема и сервера тоже
  return (
    <div className="events-calendar">
      {isFetchingEventsCountByDate ? (
        <div className="events-calendar__loader-section">
          <Loader />
        </div>
      ) : (
        <>
          <div className="events-calendar__title">
            <Typography
              className="events-calendar__title__name"
              variant="body1"
              color="textSecondary"
            >
              Календарь основных событий
            </Typography>
            <Divider className="events-calendar__title__divider" />
          </div>
          <Calendar
            startDate={startDate}
            endDate={endDate}
            values={preparedEvents}
            onClick={handleStartDateFromToFilterChange}
          />
        </>
      )}
    </div>
  );
};

EventsCalendar.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
};

EventsCalendar.defaultProps = {
  startDate: shiftDate(new Date(), -100),
  endDate: shiftDate(new Date(), 100),
};

export default EventsCalendar;
