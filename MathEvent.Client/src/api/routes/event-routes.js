import { getRoute } from '../../utils/get-route';

const eventRoutes = {
  fetchEvents: (
    eventSearch,
    parentId,
    organizationId,
    startDateFrom,
    startDateTo,
    sortByValue,
  ) => getRoute(
    `events/?search=${eventSearch}`
    + `?parent=${parentId}`
    + `&organization=${organizationId}`
    + `&startDateFrom=${startDateFrom}`
    + `&startDateTo=${startDateTo}`
    + `&sortBy=${sortByValue}`,
  ),
  fetchEventsCountByDate: (
    startDateFrom,
    startDateTo,
    offset,
  ) => getRoute(
    `events/eventsCountByDate/?startDateFrom=${startDateFrom}`
    + `&startDateTo=${startDateTo}`
    + `&offset=${offset}`,
  ),
  fetchEvent: (eventId) => getRoute(`events/${eventId}`),
  createEvent: () => getRoute('events/'),
  updateEvent: (eventId) => getRoute(`events/${eventId}/`),
  patchEvent: (eventId) => getRoute(`events/${eventId}/`),
  subscribe: (eventId) => getRoute(`events/subscribe/${eventId}/`),
  unsubscribe: (eventId) => getRoute(`events/unsubscribe/${eventId}/`),
  deleteEvent: (eventId) => getRoute(`events/${eventId}/`),
  fetchEventBreadcrumbs: (eventId) => getRoute(`events/breadcrumbs/${eventId}`),
  fetchStatistics: (
    eventSubsStatisticsTop,
  ) => getRoute(
    `events/statistics/?eventSubsStatisticsTop=${eventSubsStatisticsTop}`,
  ),
  fetchEventStatistics: (eventId) => getRoute(`events/statistics/${eventId}`),
  fetchSortByValues: () => getRoute('events/sortbyvalues'),
  uploadAvatar: (eventId) => getRoute(`events/avatar/?id=${eventId}`),
};

export default eventRoutes;
