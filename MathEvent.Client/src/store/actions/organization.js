import { createAsyncThunk } from '@reduxjs/toolkit';
import { showModal, hideModal } from './modal';
import organizationService from '../../api/services/organization-service';
import statusCode from '../../utils/status-code-reader';
import modalTypes from '../../constants/modal-types';
import { navigateToOrganizations } from '../../utils/navigator';

export const fetchOrganizations = createAsyncThunk(
  'fetchOrganizations',
  async () => {
    const response = await organizationService.fetchOrganizations();

    if (statusCode(response).ok) {
      const organizations = await response.json();

      return { organizations, hasError: false };
    }

    return { organizations: [], hasError: true };
  },
);

export const fetchOrganization = createAsyncThunk(
  'fetchOrganization',
  async (id) => {
    const response = await organizationService.fetchOrganization(id);

    if (statusCode(response).ok) {
      const organization = await response.json();

      return { organization, hasError: false };
    }

    return { organization: null, hasError: true };
  },
);

export const patchOrganization = createAsyncThunk(
  'patchOrganization',
  async ({ id, data }) => {
    const response = await organizationService.patchOrganization(id, data);

    if (statusCode(response).ok) {
      const updatedOrganization = await response.json();

      return { updatedOrganization, hasError: false };
    }

    return { updatedOrganization: null, hasError: true };
  },
);

export const createOrganization = createAsyncThunk(
  'createOrganization',
  async (organization, thunkAPI) => {
    const response = await organizationService
      .createOrganization(organization);

    if (statusCode(response).created) {
      thunkAPI.dispatch(hideModal());
      thunkAPI.dispatch(fetchOrganizations());

      return { hasError: false };
    }

    return { hasError: true };
  },
);

export const deleteOrganization = createAsyncThunk(
  'deleteOrganization',
  async (id, thunkAPI) => {
    thunkAPI.dispatch(hideModal());
    const response = await organizationService.deleteOrganization(id);

    if (statusCode(response).noContent) {
      thunkAPI.dispatch(navigateToOrganizations());

      return { id, hasError: false };
    }

    return { id: null, hasError: true };
  },
);

export const fetchStatistics = createAsyncThunk('fetchStatistics', async () => {
  const response = await organizationService.fetchStatistics();

  if (statusCode(response).ok) {
    const statistics = await response.json();

    return { statistics };
  }

  return { statistics: [] };
});

export const showCreateOrganizationModal = createAsyncThunk(
  'showCreateOrganizationModal',
  async (params, thunkAPI) => {
    thunkAPI.dispatch(showModal(modalTypes.createOrganization));
  },
);

export const showDeleteOrganizationModal = createAsyncThunk(
  'showDeleteOrganizationModal',
  async ({ id, name }, thunkAPI) => {
    thunkAPI.dispatch(showModal(modalTypes.deleteOrganization, { id, name }));
  },
);
