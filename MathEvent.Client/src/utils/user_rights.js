export const isAbleToEditEvent = (
  user, event,
) => event.managers?.includes(user.id);
