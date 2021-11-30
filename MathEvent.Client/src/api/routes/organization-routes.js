import { getRoute } from '../../utils/get-route';

const organizationRoutes = {
  fetchOrganizations: () => getRoute('organizations/'),
  fetchOrganization: (id) => getRoute(`organizations/${id}`),
  patchOrganization: (id) => getRoute(`organizations/${id}`),
  deleteOrganization: (id) => getRoute(`organizations/${id}`),
  createOrganization: () => getRoute('organizations/'),
  fetchStatistics: () => getRoute('organizations/statistics'),
};

export default organizationRoutes;
