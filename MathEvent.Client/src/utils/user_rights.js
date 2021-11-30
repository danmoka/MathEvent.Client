import roles from '../constants/roles';

export const isMathEventExecutive = (
  account,
) => account && (account.roles.includes(roles.mathEventAdmin)
  || account.roles.includes(roles.mathEventModerator));

export const isMathEventIdentityServerExecutive = (
  account,
) => account && account.roles.includes(roles.mathEventIdentityServerAdmin);

export const isAbleToEditEvent = (
  userInfo, account, event,
) => {
  if (isMathEventExecutive(account)) {
    return true;
  }

  if (event?.managers && userInfo?.id) {
    return event.managers.filter((m) => m.id === userInfo.id).length > 0;
  }

  return false;
};

export const isAbleToEditUserAccount = (
  account, userAccount,
) => {
  if (isMathEventIdentityServerExecutive(account)) {
    return true;
  }

  if (userAccount?.id && account?.sub) {
    return userAccount.id === account.sub;
  }

  return false;
};

export const isAbleToEditUserInfo = (
  account, user,
) => {
  if (isMathEventExecutive(account)) {
    return true;
  }

  if (user?.id && account?.sub) {
    return user.identityUserId === account.sub;
  }

  return false;
};

export const isAbleToAddOrEditEvent = (
  account,
) => {
  if (isMathEventExecutive(account)) {
    return true;
  }

  return false;
};
