import api from '../api';
import { baseService } from './base-service';
import { getAccessToken } from '../../utils/local-storage-manager';

const eventService = {
  fetchEvents: async (
    parentId,
    organizationId,
    startDateFrom,
    startDateTo,
    sortByValue,
  ) => {
    const url = api.events.fetchEvents(
      parentId,
      organizationId,
      startDateFrom,
      startDateTo,
      sortByValue,
    );
    const response = await baseService.get(url);

    return response;
  },
  fetchEventsCountByDate: async (
    startDateFrom,
    startDateTo,
  ) => {
    const url = api.events.fetchEventsCountByDate(
      startDateFrom,
      startDateTo,
    );
    const response = await baseService.get(url);

    return response;
  },
  fetchEvent: async (eventId) => {
    const url = api.events.fetchEvent(eventId);
    const response = await baseService.get(url);

    return response;
  },
  fetchEventBreadcrumbs: async (eventId) => {
    const url = api.events.fetchEventBreadcrumbs(eventId);
    const response = await baseService.get(url);

    return response;
  },
  fetchStatistics: async (eventSubsStatisticsTop) => {
    const url = api.events.fetchStatistics(eventSubsStatisticsTop);
    const response = await baseService.get(url);

    return response;
  },
  fetchEventStatistics: async (eventId) => {
    const url = api.events.fetchEventStatistics(eventId);
    const response = await baseService.get(url);

    return response;
  },
  fetchSortByValues: async () => {
    const url = api.events.fetchSortByValues();
    const response = await baseService.get(url);

    return response;
  },
  createEvent: async (createdEvent) => {
    const url = api.events.createEvent();
    const response = await baseService.post(url, createdEvent);

    return response;
  },
  updateEvent: async (eventId, updatedEvent) => {
    const url = api.events.updateEvent(eventId);
    const response = await baseService.put(url, updatedEvent);

    return response;
  },
  patchEvent: async (eventId, data) => {
    const url = api.events.patchEvent(eventId);
    const response = await baseService.patch(url, data);

    return response;
  },
  deleteEvent: async (eventId) => {
    const url = api.events.deleteEvent(eventId);
    const response = await baseService.delete(url);

    return response;
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
