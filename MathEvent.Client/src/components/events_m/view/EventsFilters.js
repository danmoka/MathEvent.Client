import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Dropdown from '../../_common/Dropdown';
import { fetchOrganizations } from '../../../store/actions/organization';
import { setOrganizationFilter } from '../../../store/actions/filters';
import './EventsView.scss';

const prepareOrganizations = (organizations) => [
  { value: '', name: 'Любая' },
  ...organizations.map((organization) => ({
    value: organization.id.toString(),
    name: organization.name,
  })),
];

const prepareDateTimeRange = () => [
  { value: 'any', name: 'Любой' },
  { value: 'day', name: 'Сегодня' },
  { value: 'week', name: 'На этой неделе' },
  { value: 'month', name: 'В этом месяце' },
  { value: 'year', name: 'В этом году' },
];

const EventsFilters = () => {
  const dispatch = useDispatch();
  const { organizations } = useSelector((state) => state.organization);
  const preparedOrganizations = prepareOrganizations(organizations);
  const preparedDateTimeRange = prepareDateTimeRange();

  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  const handleOrganizationFilterChange = useCallback((organizationId) => {
    dispatch(setOrganizationFilter(organizationId));
  }, [dispatch]);

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
          onChange={handleOrganizationFilterChange}
        />
        <Dropdown
          className="events-filters__dropdown"
          label="Период"
          value={preparedDateTimeRange[0].value}
          items={preparedDateTimeRange}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

export default EventsFilters;
