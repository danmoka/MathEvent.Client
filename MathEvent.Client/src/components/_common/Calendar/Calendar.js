import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/ru';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import './Calendar.scss';

const months = [
  'Янв',
  'Фев',
  'Мар',
  'Апр',
  'Май',
  'Июн',
  'Июл',
  'Авг',
  'Сен',
  'Окт',
  'Ноя',
  'Дек',
];

const days = [
  'Вс',
  'Пн',
  'Вт',
  'Ср',
  'Чт',
  'Пт',
  'Сб',
];

const prepareDateTime = (dateTime) => {
  moment.locale('ru');
  const preparedDateTime = moment(dateTime).format('LLLL');

  return preparedDateTime;
};

const Calendar = ({
  startDate,
  endDate,
  values,
  onClick,
}) => {
  const { isDarkTheme } = useSelector((state) => state.app);
  const theme = isDarkTheme ? 'dark' : 'default';
  const handleOnTooltip = (value) => {
    if (value.date) {
      return {
        'data-tip': `${prepareDateTime(value.date)} ${value.count} события`,
      };
    }

    return undefined;
  };

  return (
    <div>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        monthLabels={months}
        weekdayLabels={days}
        showWeekdayLabels
        values={values}
        classForValue={(value) => {
          if (!value) {
            return `color-${theme}-empty`;
          }
          return `color-${theme}-${value.count < 4 ? value.count : 3}`;
        }}
        tooltipDataAttrs={handleOnTooltip}
        onClick={onClick}
      />
      <ReactTooltip />
    </div>
  );
};

Calendar.propTypes = {
  values: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.shape(),
    count: PropTypes.number,
  })),
  startDate: PropTypes.shape(),
  endDate: PropTypes.shape(),
  onClick: PropTypes.func,
};

Calendar.defaultProps = {
  values: [],
  startDate: {},
  endDate: {},
  onClick: () => {},
};

export default Calendar;
