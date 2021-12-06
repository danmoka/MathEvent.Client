import api from '../api';
import { baseService } from './base-service';

const organizationService = {
  fetchOrganizations: async (organizationSearch) => {
    const url = api.organizations.fetchOrganizations(organizationSearch);

    return baseService.get(url);
  },
  fetchOrganization: async (id) => {
    const url = api.organizations.fetchOrganization(id);

    return baseService.get(url);
  },
  patchOrganization: async (id, data) => {
    const url = api.organizations.patchOrganization(id);

    return baseService.patch(url, data);
  },
  createOrganization: async (data) => {
    const url = api.organizations.createOrganization();

    return baseService.post(url, data);
  },
  deleteOrganization: async (id) => {
    const url = api.organizations.deleteOrganization(id);

    return baseService.delete(url);
  },
  fetchStatistics: async () => {
    const url = api.organizations.fetchStatistics();

    return baseService.get(url);
  },
};

export default organizationService;
