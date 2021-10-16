export const isAbleToEditEvent = (
  user, event,
) => event.managers?.filter((m) => m.id === user.sub).length > 0;
