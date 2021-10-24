const defaultOnPendingFetchValue = true;

const onPendingDefault = (state) => {
  const st = state;
  st.hasError = false;
};

const onFulfilledDefault = (state, hasError) => {
  const st = state;
  st.hasError = hasError;
};

const onRejectedDefault = (state) => {
  const st = state;
  st.hasError = true;
};

// Events
export const onPendingEvents = (state) => {
  const st = state;
  st.isFetchingEvents = defaultOnPendingFetchValue;
  onPendingDefault(state);
};

export const onFulfilledEvents = (state, hasError) => {
  const st = state;
  st.isFetchingEvents = false;
  onFulfilledDefault(state, hasError);
};

export const onRejectedEvents = (state) => {
  const st = state;
  st.isFetchingEvents = false;
  onRejectedDefault(state);
};

// Event
export const onPendingEvent = (state) => {
  const st = state;
  st.isFetchingEvent = defaultOnPendingFetchValue;
  onPendingDefault(state);
};

export const onFulfilledEvent = (state, hasError) => {
  const st = state;
  st.isFetchingEvent = false;
  onFulfilledDefault(state, hasError);
};

export const onRejectedEvent = (state) => {
  const st = state;
  st.isFetchingEvent = false;
  onRejectedDefault(state);
};

// EventBreadcrumbs
export const onPendingEventBreadcrumbs = (state) => {
  const st = state;
  st.isFetchingEventBreadcrumbs = defaultOnPendingFetchValue;
  onPendingDefault(state);
};

export const onFulfilledEventBreadcrumbs = (state, hasError) => {
  const st = state;
  st.isFetchingEventBreadcrumbs = false;
  onFulfilledDefault(state, hasError);
};

export const onRejectedEventBreadcrumbs = (state) => {
  const st = state;
  st.isFetchingEventBreadcrumbs = false;
  onRejectedDefault(state);
};

// EventsStatistics
export const onPendingEventsStatistics = (state) => {
  const st = state;
  st.isFetchingEventsStatistics = defaultOnPendingFetchValue;
  onPendingDefault(state);
};

export const onFulfilledEventsStatistics = (state, hasError) => {
  const st = state;
  st.isFetchingEventsStatistics = false;
  onFulfilledDefault(state, hasError);
};

export const onRejectedEventsStatistics = (state) => {
  const st = state;
  st.isFetchingEventsStatistics = false;
  onRejectedDefault(state);
};

// EventStatistics
export const onPendingEventStatistics = (state) => {
  const st = state;
  st.isFetchingEventStatistics = defaultOnPendingFetchValue;
  onPendingDefault(state);
};

export const onFulfilledEventStatistics = (state, hasError) => {
  const st = state;
  st.isFetchingEventStatistics = false;
  onFulfilledDefault(state, hasError);
};

export const onRejectedEventStatistics = (state) => {
  const st = state;
  st.isFetchingEventStatistics = false;
  onRejectedDefault(state);
};

// EventsCountByDate
export const onPendingEventsCountByDate = (state) => {
  const st = state;
  st.isFetchingEventsCountByDate = defaultOnPendingFetchValue;
  onPendingDefault(state);
};

export const onFulfilledEventsCountByDate = (state, hasError) => {
  const st = state;
  st.isFetchingEventsCountByDate = false;
  onFulfilledDefault(state, hasError);
};

export const onRejectedEventsCountByDate = (state) => {
  const st = state;
  st.isFetchingEventsCountByDate = false;
  onRejectedDefault(state);
};

// Events sort by values

export const onPendingSortByValues = (state) => {
  const st = state;
  st.isFetchingSortByValues = defaultOnPendingFetchValue;
  onPendingDefault(state);
};

export const onFulfilledSortByValues = (state, hasError) => {
  const st = state;
  st.isFetchingSortByValues = false;
  onFulfilledDefault(state, hasError);
};

export const onRejectedSortByValues = (state) => {
  const st = state;
  st.isFetchingSortByValues = false;
  onRejectedDefault(state);
};

// Organizations
export const onPendingOrganizations = (state) => {
  const st = state;
  st.isFetchingOrganizations = defaultOnPendingFetchValue;
  onPendingDefault(state);
};

export const onFulfilledOrganizations = (state, hasError) => {
  const st = state;
  st.isFetchingOrganizations = false;
  onFulfilledDefault(state, hasError);
};

export const onRejectedOrganizations = (state) => {
  const st = state;
  st.isFetchingOrganizations = false;
  onRejectedDefault(state);
};

// OrganizationStatistics
export const onPendingOrganizationStatistics = (state) => {
  const st = state;
  st.isFetchingOrganizationStatistics = defaultOnPendingFetchValue;
  onPendingDefault(state);
};

export const onFulfilledOrganizationStatistics = (state, hasError) => {
  const st = state;
  st.isFetchingOrganizationStatistics = false;
  onFulfilledDefault(state, hasError);
};

export const onRejectedOrganizationStatistics = (state) => {
  const st = state;
  st.isFetchingOrganizationStatistics = false;
  onRejectedDefault(state);
};

// Files
export const onPendingFiles = (state) => {
  const st = state;
  st.isFetchingFiles = defaultOnPendingFetchValue;
  onPendingDefault(state);
};

export const onFulfilledFiles = (state, hasError) => {
  const st = state;
  st.isFetchingFiles = false;
  onFulfilledDefault(state, hasError);
};

export const onRejectedFiles = (state) => {
  const st = state;
  st.isFetchingFiles = false;
  onRejectedDefault(state);
};

// File
export const onPendingFile = (state) => {
  const st = state;
  st.isFetchingFile = defaultOnPendingFetchValue;
  onPendingDefault(state);
};

export const onFulfilledFile = (state, hasError) => {
  const st = state;
  st.isFetchingFile = false;
  onFulfilledDefault(state, hasError);
};

export const onRejectedFile = (state) => {
  const st = state;
  st.isFetchingFile = false;
  onRejectedDefault(state);
};

// FileBreadcrumbs
export const onPendingFileBreadcrumbs = (state) => {
  const st = state;
  st.isFetchingFileBreadcrumbs = defaultOnPendingFetchValue;
  onPendingDefault(state);
};

export const onFulfilledFileBreadcrumbs = (state, hasError) => {
  const st = state;
  st.isFetchingFileBreadcrumbs = false;
  onFulfilledDefault(state, hasError);
};

export const onRejectedFileBreadcrumbs = (state) => {
  const st = state;
  st.isFetchingFileBreadcrumbs = false;
  onRejectedDefault(state);
};

// Account
export const onPendingAccount = (state) => {
  const st = state;
  st.isFetchingAccount = defaultOnPendingFetchValue;
  onPendingDefault(state);
};

export const onFulfilledAccount = (state, hasError) => {
  const st = state;
  st.isFetchingAccount = false;
  onFulfilledDefault(state, hasError);
};

export const onRejectedAccount = (state) => {
  const st = state;
  st.isFetchingAccount = false;
  onRejectedDefault(state);
};

// Users
export const onPendingUsers = (state) => {
  const st = state;
  st.isFetchingUsers = defaultOnPendingFetchValue;
  onPendingDefault(state);
};

export const onFulfilledUsers = (state, hasError) => {
  const st = state;
  st.isFetchingUsers = false;
  onFulfilledDefault(state, hasError);
};

export const onRejectedUsers = (state) => {
  const st = state;
  st.isFetchingUsers = false;
  onRejectedDefault(state);
};

// User
export const onPendingUser = (state) => {
  const st = state;
  st.isFetchingUser = defaultOnPendingFetchValue;
  onPendingDefault(state);
};

export const onFulfilledUser = (state, hasError) => {
  const st = state;
  st.isFetchingUser = false;
  onFulfilledDefault(state, hasError);
};

export const onRejectedUser = (state) => {
  const st = state;
  st.isFetchingUser = false;
  onRejectedDefault(state);
};

// UsersStatistics
export const onPendingUsersStatistics = (state) => {
  const st = state;
  st.isFetchingUsersStatistics = defaultOnPendingFetchValue;
  onPendingDefault(state);
};

export const onFulfilledUsersStatistics = (state, hasError) => {
  const st = state;
  st.isFetchingUsersStatistics = false;
  onFulfilledDefault(state, hasError);
};

export const onRejectedUsersStatistics = (state) => {
  const st = state;
  st.isFetchingUsersStatistics = false;
  onRejectedDefault(state);
};

// UserStatistics
export const onPendingUserStatistics = (state) => {
  const st = state;
  st.isFetchingUserStatistics = defaultOnPendingFetchValue;
  onPendingDefault(state);
};

export const onFulfilledUserStatistics = (state, hasError) => {
  const st = state;
  st.isFetchingUserStatistics = false;
  onFulfilledDefault(state, hasError);
};

export const onRejectedUserStatistics = (state) => {
  const st = state;
  st.isFetchingUserStatistics = false;
  onRejectedDefault(state);
};

// Map
export const onPendingPosition = (state) => {
  const st = state;
  st.isFetchingPosition = defaultOnPendingFetchValue;
  onPendingDefault(state);
};

export const onFulfilledPosition = (state, hasError) => {
  const st = state;
  st.isFetchingPosition = false;
  onFulfilledDefault(state, hasError);
};

export const onRejectedPosition = (state) => {
  const st = state;
  st.isFetchingPosition = false;
  onRejectedDefault(state);
};
