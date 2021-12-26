import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Dropdown from '../../_common/Dropdown';
import { DateField } from '../../_common/Date';
import { fetchOrganizations } from '../../../store/actions/organization';
import {
  setOrganizationFilter,
  setStartDateFromFilter,
  setStartDateToFilter,
} from '../../../store/actions/filters';
import './EventsView.scss';

const prepareOrganizations = (organizations) => [
  { value: '', name: 'Любая' },
  ...organizations.map((organization) => ({
    value: organization.id.toString(),
    name: organization.name,
  })),
];

const EventsFilters = () => {
  const dispatch = useDispatch();
  const { organizations } = useSelector((state) => state.organization);
  const { startDateFrom, startDateTo } = useSelector((state) => state.filters);
  const preparedOrganizations = prepareOrganizations(organizations);

  useEffect(() => {
    dispatch(fetchOrganizations({
      organizationSearch: '',
    }));
  }, [dispatch]);

  const handleOrganizationFilterChange = useCallback((organizationId) => {
    dispatch(setOrganizationFilter(organizationId));
  }, [dispatch]);

  const handleStartDateFromFilterChange = useCallback((newStartDateFrom) => {
    if (newStartDateFrom > startDateTo) {
      dispatch(setStartDateToFilter(null));
    }

    dispatch(setStartDateFromFilter(newStartDateFrom));
  }, [dispatch, startDateTo]);

  const handleStartDateToFilterChange = useCallback((newStartDateTo) => {
    dispatch(setStartDateToFilter(newStartDateTo));
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
          displayEmpty
          onChange={handleOrganizationFilterChange}
        />
        <DateField
          className="events-filters__datefield"
          showCloseButton
          value={startDateFrom}
          minDate={new Date(2015, 10)}
          onChange={handleStartDateFromFilterChange}
          label="Начало ОТ"
        />
        <DateField
          className="events-filters__datefield"
          showCloseButton
          value={startDateTo}
          minDate={startDateFrom || new Date(2015, 10)}
          onChange={handleStartDateToFilterChange}
          label="Начало ДО"
        />
      </div>
    </div>
  );
};

export default EventsFilters;
