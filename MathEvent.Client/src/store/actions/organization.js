import { createAsyncThunk } from '@reduxjs/toolkit';
import { showModal, hideModal } from './modal';
import organizationService from '../../api/services/organization-service';
import statusCode from '../../utils/status-code-reader';
import modalTypes from '../../constants/modal-types';
import { navigateToOrganizations } from '../../utils/navigator';
import { errorsToMessage } from '../../utils/validation/errorsToMessage';
import { setAlertMessage, setAlertSeverity } from './app';
import alertTypes from '../../constants/alert-types';

export const fetchOrganizations = createAsyncThunk(
  'fetchOrganizations',
  async ({ organizationSearch }) => {
    const response = await organizationService.fetchOrganizations(
      organizationSearch,
    );

    if (statusCode(response).ok) {
      const organizations = await response.json();

      return { organizations, hasError: false };
    }

    return { organizations: [], hasError: true };
  },
);

export const fetchOrganization = createAsyncThunk(
  'fetchOrganization',
  async (id, thunkAPI) => {
    const response = await organizationService.fetchOrganization(id);

    if (statusCode(response).ok) {
      const organization = await response.json();

      return { organization, hasError: false };
    }

    if (statusCode(response).badRequest) {
      const errors = await response.json();
      const message = errorsToMessage(errors);
      thunkAPI.dispatch(setAlertMessage(message));
      thunkAPI.dispatch(setAlertSeverity(alertTypes.error));
    }

    return { organization: null, hasError: true };
  },
);

export const patchOrganization = createAsyncThunk(
  'patchOrganization',
  async ({ id, data }, thunkAPI) => {
    const response = await organizationService.patchOrganization(id, data);

    if (statusCode(response).ok) {
      const updatedOrganization = await response.json();

      return { updatedOrganization, hasError: false };
    }

    if (statusCode(response).badRequest) {
      const errors = await response.json();
      const message = errorsToMessage(errors);
      thunkAPI.dispatch(setAlertMessage(message));
      thunkAPI.dispatch(setAlertSeverity(alertTypes.error));
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
      const createdOrganization = await response.json();
      thunkAPI.dispatch(hideModal());

      return { createdOrganization, hasError: false };
    }

    if (statusCode(response).badRequest) {
      const errors = await response.json();
      const message = errorsToMessage(errors);
      thunkAPI.dispatch(setAlertMessage(message));
      thunkAPI.dispatch(setAlertSeverity(alertTypes.error));
    }

    return { createdOrganization: null, hasError: true };
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

    if (statusCode(response).badRequest) {
      const errors = await response.json();
      const message = errorsToMessage(errors);
      thunkAPI.dispatch(setAlertMessage(message));
      thunkAPI.dispatch(setAlertSeverity(alertTypes.error));
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
