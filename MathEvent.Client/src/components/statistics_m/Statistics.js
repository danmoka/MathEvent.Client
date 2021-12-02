import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import TabPanel from '../_common/TabPanel_m';
import {
  navigateToEventsStatistics,
  navigateToOrganizationsStatistics,
  navigateToUsersStatistics,
} from '../../utils/navigator';
import { useTitle } from '../../hooks';
import routes from '../../utils/routes';
import EventsStatistics from './events/EventsStatistics';
import OrganizationsStatistics from './organizations/OrganizationsStatistics';
import UsersStatistics from './users/UsersStatistics';
import './Statistics.scss';

const tabRoutes = [
  routes.statistics.events,
  routes.statistics.organizations,
  routes.statistics.users,
];

const tabs = [
  {
    label: 'События',
    onClick: () => navigateToEventsStatistics(),
  },
  {
    label: 'Организации',
    onClick: () => navigateToOrganizationsStatistics(),
  },
  {
    label: 'Пользователи',
    onClick: () => navigateToUsersStatistics(),
  },
];

const Statistics = () => {
  useTitle('Статистика');

  const [value, setValue] = useState(0);
  const currentRoute = useSelector((state) => state.router.location.pathname);

  useEffect(() => {
    tabRoutes.forEach((v, i) => {
      if (currentRoute.includes(v)) {
        setValue(i);
      }
    });
  }, [currentRoute, value]);

  useEffect(() => {
    if (currentRoute === routes.statistics.main) {
      navigateToEventsStatistics();
    }
  }, [currentRoute]);

  return (
    <div className="statistics">
      <div className="statistics__tabs">
        <TabPanel tabs={tabs} value={value} />
      </div>
      <div className="statistics__content">
        <Route
          path={routes.statistics.events}
          component={EventsStatistics}
        />
        <Route
          path={routes.statistics.organizations}
          component={OrganizationsStatistics}
        />
        <Route
          path={routes.statistics.users}
          component={UsersStatistics}
        />
      </div>
    </div>
  );
};

export default Statistics;
