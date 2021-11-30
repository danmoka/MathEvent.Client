/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  createOrganization,
  fetchOrganization,
  fetchOrganizations,
  fetchStatistics,
  patchOrganization,
} from '../actions/organization';

const initialState = {
  organizations: [],
  organization: undefined,
  statistics: [],
  isFetchingOrganizations: false,
  isFetchingOrganization: false,
  isFetchingOrganizationStatistics: false,
  hasError: false,
};

const organizationSlice = createSlice({
  name: 'organizationSlice',
  initialState,
  extraReducers: {
    [fetchOrganizations.fulfilled]: (state, {
      payload: { organizations, hasError },
    }) => {
      state.isFetchingOrganizations = false;
      state.hasError = hasError;

      if (!hasError) {
        state.organizations = organizations;
      }
    },
    [fetchOrganizations.pending]: (state) => {
      state.isFetchingOrganizations = true;
    },
    [fetchOrganizations.rejected]: (state) => {
      state.isFetchingOrganizations = false;
      state.hasError = true;
      state.organizations = [];
    },

    [fetchOrganization.fulfilled]: (state, {
      payload: { organization, hasError },
    }) => {
      state.isFetchingOrganization = false;
      state.hasError = hasError;

      if (!hasError) {
        state.organization = organization;
      }
    },
    [fetchOrganization.pending]: (state) => {
      state.isFetchingOrganization = true;
    },
    [fetchOrganization.rejected]: (state) => {
      state.isFetchingOrganization = false;
      state.hasError = true;
      state.organization = null;
    },

    [patchOrganization.fulfilled]: (state, {
      payload: { updatedOrganization, hasError },
    }) => {
      state.isFetchingOrganization = false;
      state.hasError = hasError;

      if (!hasError) {
        state.organization = updatedOrganization;
      }
    },
    [patchOrganization.pending]: (state) => {
      state.isFetchingOrganization = true;
    },
    [patchOrganization.rejected]: (state) => {
      state.isFetchingOrganization = false;
      state.hasError = true;
      state.organization = null;
    },

    [createOrganization.fulfilled]: (state, {
      payload: { hasError },
    }) => {
      state.isFetchingOrganization = false;
      state.hasError = hasError;
    },
    [createOrganization.pending]: (state) => {
      state.isFetchingOrganization = true;
    },
    [createOrganization.rejected]: (state) => {
      state.isFetchingOrganization = false;
      state.hasError = true;
    },

    [fetchStatistics.pending]: (state) => {
      state.isFetchingOrganizationStatistics = true;
    },
    [fetchStatistics.fulfilled]: (state, {
      payload: { statistics, hasError },
    }) => {
      state.isFetchingOrganizationStatistics = false;
      state.hasError = hasError;

      if (!hasError) {
        state.statistics = statistics;
      }
    },
    [fetchStatistics.rejected]: (state) => {
      state.isFetchingOrganizationStatistics = false;
      state.hasError = true;
      state.statistics = [];
    },
  },
});

export default organizationSlice.reducer;
