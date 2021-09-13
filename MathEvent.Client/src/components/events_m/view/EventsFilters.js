import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Dropdown from '../../_common/Dropdown';
import './EventsView.scss';

const prepareOrganizations = () => [
  { value: '1', name: 'ЯрГУ' },
  { value: '2', name: 'ЯГТУ' },
];

const prepareDateTimeRange = () => [
  { value: 'day', name: 'Сегодня' },
  { value: 'week', name: 'На этой неделе' },
  { value: 'month', name: 'В этом месяце' },
  { value: 'year', name: 'В этом году' },
];

const EventsFilters = () => {
  const preparedOrganizations = prepareOrganizations();
  const preparedDateTimeRange = prepareDateTimeRange();

  return (
    <div className="events-filters">
      <div className="events-filters__title">
        <Typography
          className="events-filters__title__name"
          variant="body1"
          color="textSecondary"
        >
          Фильтры
        </Typography>
        <Divider className="events-filters__title__divider" />
      </div>
      <div className="events-filters__main">
        <Dropdown
          className="events-filters__dropdown"
          label="Организация"
          value={preparedOrganizations[0].value}
          items={preparedOrganizations}
          onChange={() => {}}
        />
        <Dropdown
          className="events-filters__dropdown"
          label="Время"
          value={preparedDateTimeRange[0].value}
          items={preparedDateTimeRange}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

export default EventsFilters;
