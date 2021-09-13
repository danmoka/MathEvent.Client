import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Calendar from '../../_common/Calendar';
import './EventsView.scss';

const shiftDate = (date, numDays) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
};

const getRange = (count) => Array.from({ length: count }, (_, i) => i);

const getRandomInt = (min, max) => Math.floor(
  Math.random() * (max - min + 1),
) + min;

const today = new Date();
const randomValues = getRange(200).map((index) => ({
  date: shiftDate(today, -index),
  count: getRandomInt(1, 3),
}));

const EventsCalendar = () => (
  <div className="events-calendar">
    <div className="events-calendar__title">
      <Typography
        className="events-calendar__title__name"
        variant="body1"
        color="textSecondary"
      >
        Календарь
      </Typography>
      <Divider className="events-calendar__title__divider" />
    </div>
    <Calendar
      startDate={shiftDate(today, -100)}
      endDate={shiftDate(today, 100)}
      values={randomValues}
    />
  </div>
);

export default EventsCalendar;
