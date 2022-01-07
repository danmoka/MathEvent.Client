/* eslint-disable no-console */
import api from '../api';
import { baseService } from './base-service';
import { getAccessToken } from '../../utils/local-storage-manager';

const eventService = {
  fetchEvents: async (
    eventSearch,
    parentId,
    organizationId,
    startDateFrom,
    startDateTo,
    sortByValue,
  ) => {
    const url = api.events.fetchEvents(
      eventSearch,
      parentId,
      organizationId,
      startDateFrom,
      startDateTo,
      sortByValue,
    );
    return baseService.get(url);
  },
  fetchEventsCountByDate: async (
    startDateFrom,
    startDateTo,
    offset,
  ) => {
    const url = api.events.fetchEventsCountByDate(
      startDateFrom,
      startDateTo,
      offset,
    );
    return baseService.get(url);
  },
  fetchEvent: async (eventId) => {
    const url = api.events.fetchEvent(eventId);

    return baseService.get(url);
  },
  fetchEventBreadcrumbs: async (eventId) => {
    const url = api.events.fetchEventBreadcrumbs(eventId);

    return baseService.get(url);
  },
  fetchStatistics: async (eventSubsStatisticsTop) => {
    const url = api.events.fetchStatistics(eventSubsStatisticsTop);

    return baseService.get(url);
  },
  fetchEventStatistics: async (eventId) => {
    const url = api.events.fetchEventStatistics(eventId);

    return baseService.get(url);
  },
  fetchSortByValues: async () => {
    const url = api.events.fetchSortByValues();

    return baseService.get(url);
  },
  createEvent: async (createdEvent) => {
    const url = api.events.createEvent();

    return baseService.post(url, createdEvent);
  },
  updateEvent: async (eventId, updatedEvent) => {
    const url = api.events.updateEvent(eventId);

    return baseService.put(url, updatedEvent);
  },
  patchEvent: async (eventId, data) => {
    const url = api.events.patchEvent(eventId);

    return baseService.patch(url, data);
  },
  subscribe: async (eventId) => {
    const url = api.events.subscribe(eventId);

    return baseService.post(url);
  },
  unsubscribe: async (eventId) => {
    const url = api.events.unsubscribe(eventId);

    return baseService.post(url);
  },
  deleteEvent: async (eventId) => {
    const url = api.events.deleteEvent(eventId);

    return baseService.delete(url);
  },
  uploadAvatar: async (eventId, file) => {
    const url = api.events.uploadAvatar(eventId);

    try {
      const formData = new FormData();
      formData.append('file', file, file.name);
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });

      return response;
    } catch (e) {
      console.log(e);

      return undefined;
    }
  },
};

export default eventService;
