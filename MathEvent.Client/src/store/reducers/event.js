import { createSlice } from '@reduxjs/toolkit';
import {
  onPendingEvents,
  onFulfilledEvents,
  onRejectedEvents,
  onPendingEvent,
  onFulfilledEvent,
  onRejectedEvent,
  onPendingEventBreadcrumbs,
  onFulfilledEventBreadcrumbs,
  onRejectedEventBreadcrumbs,
  onPendingEventsStatistics,
  onFulfilledEventsStatistics,
  onRejectedEventsStatistics,
  onPendingEventStatistics,
  onFulfilledEventStatistics,
  onRejectedEventStatistics,
  onPendingEventsCountByDate,
  onFulfilledEventsCountByDate,
  onRejectedEventsCountByDate,
} from './defaults';
import {
  fetchEvents,
  fetchEvent,
  createEvent,
  selectEvent,
  setGridView,
  fetchEventBreadcrumbs,
  fetchEventStatistics,
  fetchStatistics,
  updateEvent,
  patchEvent,
  deleteEvent,
  uploadEventAvatar,
  fetchEventsCountByDate,
} from '../actions/event';

const initialState = {
  events: [],
  eventInfo: null,
  selectedEvent: null,
  crumbs: [],
  eventStatistics: [],
  statistics: [],
  eventsCountByDate: {},
  isGridView: true,
  isFetchingEvents: false,
  isFetchingEvent: false,
  isFetchingEventBreadcrumbs: false,
  isFetchingEventsStatistics: false,
  isFetchingEventsCountByDate: false,
  hasError: false,
};

const eventSlice = createSlice({
  name: 'eventSlice',
  initialState,
  extraReducers: {
    [fetchEvents.pending]: (state) => {
      onPendingEvents(state);
    },
    [fetchEvents.fulfilled]: (state, { payload: { events, hasError } }) => {
      const st = state;
      onFulfilledEvents(st, hasError);

      if (!hasError) {
        st.events = events;
      }
    },
    [fetchEvents.rejected]: (state) => {
      const st = state;
      onRejectedEvents(st);
      st.events = [];
      st.selectedEvent = null;
    },

    [fetchEventsCountByDate.pending]: (state) => {
      onPendingEventsCountByDate(state);
    },
    [fetchEventsCountByDate.fulfilled]: (state, {
      payload: {
        eventsCountByDate, hasError,
      },
    }) => {
      const st = state;
      onFulfilledEventsCountByDate(st, hasError);

      if (!hasError) {
        st.eventsCountByDate = eventsCountByDate;
      }
    },
    [fetchEventsCountByDate.rejected]: (state) => {
      const st = state;
      onRejectedEventsCountByDate(st);
      st.eventsCountByDate = {};
    },

    [fetchEvent.pending]: (state) => {
      onPendingEvent(state);
    },
    [fetchEvent.fulfilled]: (state, { payload: { event, hasError } }) => {
      const st = state;
      onFulfilledEvent(st, hasError);

      if (!hasError) {
        st.eventInfo = event;
      }
    },
    [fetchEvent.rejected]: (state) => {
      const st = state;
      onRejectedEvent(st);
      st.eventInfo = null;
    },
    [createEvent.pending]: (state) => {
      onPendingEvents(state);
    },
    [createEvent.fulfilled]: (state, { payload: { hasError } }) => {
      onFulfilledEvents(state, hasError);
    },
    [createEvent.rejected]: (state) => {
      onRejectedEvents(state);
    },

    [selectEvent]: (state, { payload: { event } }) => {
      const st = state;
      st.selectedEvent = event;
    },
    [setGridView]: (state, { payload: { isGridView } }) => {
      const st = state;
      st.isGridView = isGridView;
    },

    [fetchEventBreadcrumbs.pending]: (state) => {
      onPendingEventBreadcrumbs(state);
    },
    [fetchEventBreadcrumbs.fulfilled]: (
      state,
      { payload: { crumbs, hasError } },
    ) => {
      const st = state;
      onFulfilledEventBreadcrumbs(st, hasError);
      st.crumbs = crumbs;
    },
    [fetchEventBreadcrumbs.rejected]: (state) => {
      const st = state;
      onRejectedEventBreadcrumbs(st);
      st.crumbs = [];
    },

    [fetchStatistics.pending]: (state) => {
      onPendingEventsStatistics(state);
    },
    [fetchStatistics.fulfilled]: (
      state,
      { payload: { statistics, hasError } },
    ) => {
      const st = state;
      onFulfilledEventsStatistics(st, hasError);

      if (!hasError) {
        st.statistics = statistics;
      }
    },
    [fetchStatistics.rejected]: (state) => {
      const st = state;
      onRejectedEventsStatistics(st);
      st.statistics = [];
    },

    [fetchEventStatistics.pending]: (state) => {
      onPendingEventStatistics(state);
    },
    [fetchEventStatistics.fulfilled]: (
      state,
      { payload: { statistics, hasError } },
    ) => {
      const st = state;
      onFulfilledEventStatistics(st, hasError);

      if (!hasError) {
        st.eventStatistics = statistics;
      }
    },
    [fetchEventStatistics.rejected]: (state) => {
      const st = state;
      onRejectedEventStatistics(st);
      st.eventStatistics = [];
    },

    [updateEvent.pending]: (state) => {
      onPendingEvent(state);
    },
    [updateEvent.fulfilled]: (
      state,
      { payload: { updatedEvent, hasError } },
    ) => {
      const st = state;
      onFulfilledEvent(st, hasError);

      if (!hasError) {
        st.eventInfo = updatedEvent;
      }
    },
    [updateEvent.rejected]: (state) => {
      const st = state;
      onRejectedEvent(st);
      st.eventInfo = null;
    },

    [patchEvent.pending]: (state) => {
      onPendingEvent(state);
    },
    [patchEvent.fulfilled]: (
      state,
      { payload: { updatedEvent, hasError } },
    ) => {
      const st = state;
      onFulfilledEvent(st, hasError);

      if (!hasError) {
        st.eventInfo = updatedEvent;
      }
    },
    [patchEvent.rejected]: (state) => {
      const st = state;
      onRejectedEvent(st);
      st.eventInfo = null;
    },

    [deleteEvent.pending]: (state) => {
      onPendingEvent(state);
    },
    [deleteEvent.fulfilled]: (state, { payload: { eventId, hasError } }) => {
      const st = state;
      onFulfilledEvent(st, hasError);

      if (!hasError) {
        if (st.eventInfo?.id === eventId) {
          st.eventInfo = null;
        }
      }
    },
    [deleteEvent.rejected]: (state) => {
      onRejectedEvent(state);
    },

    [uploadEventAvatar.pending]: (state) => {
      onPendingEvent(state);
    },
    [uploadEventAvatar.fulfilled]: (
      state,
      { payload: { updatedEvent, hasError } },
    ) => {
      const st = state;
      onFulfilledEvent(st, hasError);

      if (!hasError) {
        st.eventInfo = updatedEvent;
      }
    },
    [uploadEventAvatar.rejected]: (state) => {
      onRejectedEvent(state);
    },
  },
});

export default eventSlice.reducer;
