export const isAbleToEditEvent = (
  user, event,
) => {
  if (event?.managers && user?.id) {
    return event.managers.filter((m) => m.id === user.id).length > 0;
  }

  return false;
};

export const isAbleToEditUser = (
  user, userInfo,
) => {
  if (userInfo?.id && user?.sub) {
    return userInfo.id === user.sub;
  }

  return false;
};
