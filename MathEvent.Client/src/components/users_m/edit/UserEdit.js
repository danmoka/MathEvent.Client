import React, {
  useEffect, useCallback, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Paper from '@material-ui/core/Paper';
import Loader from '../../_common/Loader';
import { iconTypes, IconButton } from '../../_common/Icon';
import { HugeText } from '../../_common/Text/Text';
import UserEditAccount from './UserEditAccount';
import UserEditInfo from './UserEditInfo';
import UserEditEvents from './UserEditEvents';
import {
  fetchOrCreateUserInfo,
  fetchUserAccount,
  patchUserInfo,
} from '../../../store/actions/user';
import { setIsDarkTheme } from '../../../store/actions/app';
import { navigateToUser } from '../../../utils/navigator';
import {
  isAbleToEditUserInfo,
  isAbleToEditUserAccount,
} from '../../../utils/user_rights';
import { useTitle } from '../../../hooks';
import './UserEdit.scss';

const UserEdit = () => {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.account);
  const {
    userInfo,
    isFetchingUserInfo,
    userAccount,
    isFetchingUserAccount,
  } = useSelector((state) => state.user);
  const { isDarkTheme } = useSelector((state) => state.app);

  const [canEditUserAccount, setCanEditUserAccount] = useState(true);
  const [canEditUserInfo, setCanEditUserInfo] = useState(true);

  const { id } = useParams();
  useTitle('Редактирование пользователя');

  useEffect(() => {
    dispatch(fetchUserAccount(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (userAccount && account) {
      setCanEditUserAccount(isAbleToEditUserAccount(account, userAccount));
    }
  }, [account, userAccount]);

  useEffect(() => {
    if (!canEditUserAccount) {
      navigateToUser(id);
    }
  }, [dispatch, id, canEditUserAccount]);

  useEffect(() => {
    if (userAccount?.id === id.toLowerCase()) {
      if (!userInfo || userInfo.identityUserId !== id.toLowerCase()) {
        const {
          id: identityUserId,
          name,
          surname,
          email,
        } = userAccount;
        dispatch(fetchOrCreateUserInfo({
          identityUserId,
          email,
          name,
          surname,
        }));
      }
    }
  }, [dispatch, id, userAccount, userAccount?.id, userInfo]);

  useEffect(() => {
    if (userInfo && userAccount) {
      if (userInfo.identityUserId === userAccount.id) {
        if (userInfo.name !== userAccount.name) {
          const patchDocument = [
            {
              value: userAccount.name,
              path: '/Name',
              op: 'replace',
            },
          ];
          dispatch(patchUserInfo({
            identityUserId: userInfo.identityUserId,
            data: patchDocument,
          }));
        }

        if (userInfo.surname !== userAccount.surname) {
          const patchDocument = [
            {
              value: userAccount.surname,
              path: '/Surname',
              op: 'replace',
            },
          ];
          dispatch(patchUserInfo({
            identityUserId: userInfo.identityUserId,
            data: patchDocument,
          }));
        }
      }
    }
  }, [dispatch, userAccount, userInfo]);

  useEffect(() => {
    if (userInfo && account) {
      setCanEditUserInfo(isAbleToEditUserInfo(account, userInfo));
    }
  }, [account, userInfo]);

  const handleLightThemeClick = useCallback(() => {
    dispatch(setIsDarkTheme(false));
  }, [dispatch]);

  const handleDarkThemeClick = useCallback(() => {
    dispatch(setIsDarkTheme(true));
  }, [dispatch]);

  return (
    <div className="user-edit">
      <Paper className="user-edit__header">
        <HugeText>
          Личный кабинет
        </HugeText>
        {isDarkTheme ? (
          <IconButton
            type={iconTypes.setLight}
            title="Включить светлую тему"
            onClick={handleLightThemeClick}
          />
        ) : (
          <IconButton
            type={iconTypes.setDark}
            title="Включить темную тему"
            onClick={handleDarkThemeClick}
          />
        )}
      </Paper>
      { isFetchingUserAccount
        ? (
          <div className="user-edit__loader-section">
            <Loader />
          </div>
        )
        : (
          <>
            { userAccount && canEditUserAccount
            && (
              <UserEditAccount
                accountId={userAccount.id}
                accountName={userAccount.name}
                accountSurname={userAccount.surname}
                email={userAccount.email}
                username={userAccount.userName}
              />
            )}
          </>
        )}
      { isFetchingUserInfo
        ? (
          <div className="user-edit__loader-section">
            <Loader />
          </div>
        )
        : (
          <>
            { userInfo && canEditUserInfo
            && (
              <>
                <UserEditInfo
                  identityUserId={userInfo.identityUserId}
                  userOrganization={userInfo.organization}
                />
                { userInfo.managedEvents
                && userInfo.events
                && (
                  <UserEditEvents
                    identityUserId={userInfo.identityUserId}
                    managedEvents={userInfo.managedEvents}
                    events={userInfo.events}
                  />
                )}
              </>
            )}
          </>
        )}
    </div>
  );
};

export default UserEdit;
