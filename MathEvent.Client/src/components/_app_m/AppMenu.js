import React from 'react';
import { useSelector } from 'react-redux';
import {
  navigateToEvents,
  navigateToOrganizations,
  navigateToUsers,
  navigateToStatistics,
} from '../../utils/navigator';
import routes from '../../utils/routes';
import { iconTypes } from '../_common/Icon';
import TabPanel from '../_common/TabPanel_m';

const tabRoutes = [
  routes.events.main,
  routes.organizations.main,
  routes.users.main,
  routes.statistics.main,
];

const tabs = [
  {
    label: 'События',
    iconType: iconTypes.events,
    onClick: () => navigateToEvents(),
  },
  {
    label: 'Организации',
    iconType: iconTypes.business,
    onClick: () => navigateToOrganizations(),
  },
  {
    label: 'Пользователи',
    iconType: iconTypes.people,
    onClick: () => navigateToUsers(),
  },
  {
    label: 'Статистика',
    iconType: iconTypes.stats,
    onClick: () => navigateToStatistics(),
  },
];

const AppMenu = () => {
  const currentRoute = useSelector((state) => state.router.location.pathname);

  return (
    <TabPanel tabs={tabs} value={tabRoutes.indexOf(currentRoute)} />
  );
};

export default AppMenu;
