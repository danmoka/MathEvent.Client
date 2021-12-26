import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { showModal, hideModal } from './modal';
import eventService from '../../api/services/event-service';
import statusCode from '../../utils/status-code-reader';
import modalTypes from '../../constants/modal-types';
import { navigateToEvents } from '../../utils/navigator';

export const fetchEvents = createAsyncThunk('fetchEvents', async (
  {
    eventSearch,
    parentId,
    organizationId,
    startDateFrom,
    startDateTo,
    sortByValue,
  },
) => {
  const response = await eventService.fetchEvents(
    eventSearch,
    parentId,
    organizationId,
    startDateFrom,
    startDateTo,
    sortByValue,
  );

  if (statusCode(response).ok) {
    const events = await response.json();

    return { events };
  }

  return { events: [] };
});

export const fetchEventsCountByDate = createAsyncThunk(
  'fetchEventsByDate', async (
    {
      startDateFrom,
      startDateTo,
    },
  ) => {
    const response = await eventService.fetchEventsCountByDate(
      startDateFrom,
      startDateTo,
    );

    if (statusCode(response).ok) {
      const eventsCountByDate = await response.json();

      return { eventsCountByDate };
    }

    return { eventsCountByDate: {} };
  },
);

export const fetchEvent = createAsyncThunk('fetchEvent', async (eventId) => {
  const response = await eventService.fetchEvent(eventId);

  if (statusCode(response).ok) {
    const event = await response.json();

    return { event };
  }

  return { event: null };
});

export const fetchEventBreadcrumbs = createAsyncThunk(
  'fetchEventBreadcrumbs',
  async (eventId) => {
    if (!eventId) {
      return { crumbs: [] };
    }

    const response = await eventService.fetchEventBreadcrumbs(eventId);

    if (statusCode(response).ok) {
      const crumbs = await response.json();

      return { crumbs };
    }

    return { crumbs: [] };
  },
);

export const fetchStatistics = createAsyncThunk(
  'fetchStatistics',
  async (eventSubsStatisticsTop) => {
    const response = await eventService.fetchStatistics(eventSubsStatisticsTop);

    if (statusCode(response).ok) {
      const statistics = await response.json();

      return { statistics };
    }

    return { statistics: [] };
  },
);

export const fetchEventStatistics = createAsyncThunk(
  'fetchEventStatistics',
  async (eventId) => {
    const response = await eventService.fetchEventStatistics(eventId);

    if (statusCode(response).ok) {
      const statistics = await response.json();

      return { statistics };
    }

    return { statistics: [] };
  },
);

export const createEvent = createAsyncThunk(
  'createEvent',
  async ({ event }, thunkAPI) => {
    const response = await eventService.createEvent(event);

    if (statusCode(response).created) {
      const createdEvent = await response.json();
      thunkAPI.dispatch(hideModal());

      return { createdEvent, hasError: false };
    }

    return { createdEvent: null, hasError: true };
  },
);

export const updateEvent = createAsyncThunk(
  'updateEvent',
  async ({ eventId, event }, thunkAPI) => {
    const response = await eventService.updateEvent(eventId, event);

    if (statusCode(response).ok) {
      const updatedEvent = await response.json();
      thunkAPI.dispatch(fetchEvents(updatedEvent.parentId));

      return { updatedEvent, hasError: false };
    }

    return { hasError: true };
  },
);

export const patchEvent = createAsyncThunk(
  'patchEvent',
  async ({ eventId, data }, thunkAPI) => {
    const response = await eventService.patchEvent(eventId, data);

    if (statusCode(response).ok) {
      const updatedEvent = await response.json();
      thunkAPI.dispatch(fetchEvents(updatedEvent.parentId));

      return { updatedEvent, hasError: false };
    }

    return { hasError: true };
  },
);

export const subscribe = createAsyncThunk(
  'subscribe',
  async ({ eventId }) => {
    const response = await eventService.subscribe(eventId);

    if (statusCode(response).ok) {
      const updatedEvent = await response.json();

      return { updatedEvent, hasError: false };
    }

    return { hasError: true };
  },
);

export const unsubscribe = createAsyncThunk(
  'unsubscribe',
  async ({ eventId }) => {
    const response = await eventService.unsubscribe(eventId);

    if (statusCode(response).ok) {
      const updatedEvent = await response.json();

      return { updatedEvent, hasError: false };
    }

    return { hasError: true };
  },
);

export const deleteEvent = createAsyncThunk(
  'deleteEvent',
  async ({ eventId }, thunkAPI) => {
    thunkAPI.dispatch(hideModal());
    const response = await eventService.deleteEvent(eventId);

    if (statusCode(response).noContent) {
      thunkAPI.dispatch(navigateToEvents());

      return { eventId, hasError: false };
    }

    return { hasError: true };
  },
);

export const uploadEventAvatar = createAsyncThunk(
  'uploadEventAvatar',
  async ({ eventId, file }, thunkAPI) => {
    thunkAPI.dispatch(hideModal());
    const response = await eventService.uploadAvatar(eventId, file);

    if (statusCode(response).ok) {
      const updatedEvent = await response.json();
      thunkAPI.dispatch(fetchEvents(updatedEvent.parentId));

      return { updatedEvent, hasError: false };
    }

    return { hasError: true };
  },
);

export const selectEvent = createAction('selectEvent', (event) => ({
  payload: { event },
}));
export const setGridView = createAction('setGridView', (isGridView) => ({
  payload: { isGridView },
}));

export const showCreateEventModal = createAsyncThunk(
  'showCreateEventModal',
  async (params, thunkAPI) => {
    thunkAPI.dispatch(showModal(modalTypes.createEvent));
  },
);
export const showDeleteEventModal = createAsyncThunk(
  'showDeleteEventModal',
  async ({ id, name }, thunkAPI) => {
    thunkAPI.dispatch(showModal(modalTypes.deleteEvent, { id, name }));
  },
);
export const showUploadEventAvatarModal = createAsyncThunk(
  'showUploadEventAvatarModal',
  async ({ eventId }, thunkAPI) => {
    thunkAPI.dispatch(showModal(modalTypes.uploadEventAvatar, { eventId }));
  },
);
export const showEventAddManagerModal = createAsyncThunk(
  'showEventAddManagerModal',
  async (params, thunkAPI) => {
    thunkAPI.dispatch(
      showModal(modalTypes.eventAddManagerModal),
    );
  },
);
export const showEventLocation = createAsyncThunk(
  'showEventLocation',
  async ({ position }, thunkAPI) => {
    thunkAPI.dispatch(showModal(modalTypes.eventLocation, { position }));
  },
);
export const showEventStatistics = createAsyncThunk(
  'showEventStatistics',
  async ({ event }, thunkAPI) => {
    thunkAPI.dispatch(showModal(modalTypes.eventStatistics, { event }));
  },
);

export const showZoomImage = createAsyncThunk(
  'showZoomImage', ({ src }, thunkApi) => {
    thunkApi.dispatch(showModal(modalTypes.zoomImage, { src }));
  },
);
