export const isAbleToEditEvent = (
  user, event,
) => {
  if (event?.managers && user?.sub) {
    return event.managers.filter((m) => m.id === user.sub).length > 0;
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
