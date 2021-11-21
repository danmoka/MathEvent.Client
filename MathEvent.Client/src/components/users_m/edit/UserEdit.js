import React, {
  useEffect, useCallback, useState, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useDebouncedCallback } from 'use-debounce';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Loader from '../../_common/Loader';
import TextField from '../../_common/TextField';
import Dropdown from '../../_common/Dropdown';
import CardCollection from '../../_common/CardCollection';
import { iconTypes, IconButton } from '../../_common/Icon';
import { NormalText, HugeText } from '../../_common/Text/Text';
import {
  patchUserAccount,
  fetchUserAccount,
} from '../../../store/actions/account';
import { patchUserInfo, fetchUserInfo } from '../../../store/actions/user';
import { setIsDarkTheme } from '../../../store/actions/app';
import { fetchOrganizations } from '../../../store/actions/organization';
import {
  navigateToUser,
  navigateToEvent,
  navigateToEventEdit,
} from '../../../utils/navigator';
import { isAbleToEditUser } from '../../../utils/user_rights';
import { useTitle } from '../../../hooks';
import { prepareImage } from '../../../utils/get-image-src';
import './UserEdit.scss';

const prepareEvents = (
  events,
  onClick,
  prepareActions,
  isDarkTheme,
) => events.map((event, index) => ({
  id: event.id,
  primaryText: event.name,
  additionalInfo: event.description,
  image: prepareImage(event.avatarPath, isDarkTheme),
  actions: prepareActions(event),
  index: index + 1,
  onClick: () => onClick(event),
}));

const prepareOrganizations = (organizations) => (organizations
  ? [{ value: '', name: 'Без организации' },
    ...organizations.map((organization) => ({
      value: organization.id.toString(),
      name: organization.name,
    })),
  ]
  : []);

const UserEdit = () => {
  const dispatch = useDispatch();
  const {
    account,
    userAccount,
    isFetchingUserAccount,
  } = useSelector((state) => state.account);
  const { userInfo, isFetchingUser } = useSelector((state) => state.user);
  const { organizations } = useSelector((state) => state.organization);
  const { isDarkTheme } = useSelector((state) => state.app);

  const [isAbleToEditUserAccount, setIsAbleToEditUserAccount] = useState(true);
  const [isAbleToEditUserInfo, setIsAbleToEditUserInfo] = useState(true);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [organization, setOrganization] = useState('');

  const { id } = useParams();
  useTitle('Редактирование пользователя');

  useEffect(() => {
    if (isAbleToEditUserAccount && account) {
      dispatch(fetchUserAccount(id));
    }
  }, [dispatch, account, id, isAbleToEditUserAccount]);

  useEffect(() => {
    if (isAbleToEditUserInfo && account) {
      dispatch(fetchUserInfo(account));
    }
  }, [dispatch, account, isAbleToEditUserInfo]);

  useEffect(() => {
    if (userAccount && account) {
      setIsAbleToEditUserAccount(isAbleToEditUser(account, userAccount));
    }
  }, [account, userAccount]);

  useEffect(() => {
    if (userInfo && account) {
      setIsAbleToEditUserInfo(isAbleToEditUser(account, userInfo));
    }
  }, [account, userInfo]);

  useEffect(() => {
    if (!isAbleToEditUserAccount) {
      navigateToUser(id);
    }
  }, [dispatch, id, isAbleToEditUserAccount]);

  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  useEffect(() => {
    if (userAccount) {
      setUserId(userAccount.id);
      setName(userAccount.name);
      setSurname(userAccount.surname);
      setEmail(userAccount.email);
      setUsername(userAccount.userName);
    }
  }, [userAccount]);

  useEffect(() => {
    if (userInfo) {
      setOrganization(userInfo.organization?.id.toString());
    }
  }, [userInfo]);

  const handleLightThemeClick = useCallback(() => {
    dispatch(setIsDarkTheme(false));
  }, [dispatch]);

  const handleDarkThemeClick = useCallback(() => {
    dispatch(setIsDarkTheme(true));
  }, [dispatch]);

  const preparedOrganizations = useMemo(
    () => prepareOrganizations(organizations),
    [organizations],
  );

  const handleEventClick = useCallback((event) => {
    navigateToEvent(event.id);
  }, []);

  const preparedManagedEvents = useMemo(
    () => (userInfo
      ? prepareEvents(
        userInfo.managedEvents,
        handleEventClick,
        (ev) => [
          {
            id: 'edit',
            label: 'Редактировать',
            icon: iconTypes.edit,
            onClick: () => navigateToEventEdit(ev.id),
          },
        ],
        isDarkTheme,
      )
      : []),
    [handleEventClick, isDarkTheme, userInfo],
  );

  const preparedEvents = useMemo(
    () => (userInfo
      ? prepareEvents(
        userInfo.events,
        handleEventClick,
        () => [],
        isDarkTheme,
      )
      : []),
    [handleEventClick, isDarkTheme, userInfo],
  );

  const handlePatchUserAccount = useCallback(
    (data) => {
      dispatch(
        patchUserAccount({
          userId,
          data,
        }),
      );
    },
    [dispatch, userId],
  );

  const handlePatchUserInfo = useCallback(
    (data) => {
      dispatch(
        patchUserInfo(data),
      );
    },
    [dispatch],
  );

  const handleNameValueChange = useDebouncedCallback((newName) => {
    setName(newName);
    const patchName = {
      value: newName,
      path: '/Name',
      op: 'replace',
    };
    handlePatchUserAccount([patchName]);
    handlePatchUserInfo([patchName]);
  }, 1000);

  const handleSurnameValueChange = useDebouncedCallback((newSurname) => {
    setSurname(newSurname);
    const patchSurname = {
      value: newSurname,
      path: '/Surname',
      op: 'replace',
    };
    handlePatchUserAccount([patchSurname]);
    handlePatchUserInfo([patchSurname]);
  }, 1000);

  const handleUsernameValueChange = useDebouncedCallback((newUsername) => {
    setUsername(newUsername);
    handlePatchUserAccount([
      {
        value: newUsername,
        path: '/UserName',
        op: 'replace',
      },
    ]);
  }, 1000);

  const handleOrganizationChange = useCallback((newOrganization) => {
    setOrganization(newOrganization);
    handlePatchUserInfo([
      {
        value: newOrganization || null,
        path: '/OrganizationId',
        op: 'replace',
      },
    ]);
  }, [handlePatchUserInfo]);

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
            { userAccount
            && (
            <>
              <Paper className="user-edit__body">
                <TextField
                  className="user-edit__body__control"
                  label="Email"
                  value={email}
                  disabled
                  onChange={() => {}}
                />
                <TextField
                  className="user-edit__body__control"
                  label="Фамилия"
                  value={surname}
                  onChange={handleSurnameValueChange}
                />
                <TextField
                  className="user-edit__body__control"
                  label="Имя"
                  value={name}
                  onChange={handleNameValueChange}
                />
                <TextField
                  className="user-edit__body__control"
                  label="Логин"
                  value={username}
                  onChange={handleUsernameValueChange}
                />
                { userInfo && (
                  <Dropdown
                    className="user-edit__body__control"
                    label="Организация"
                    variant="outlined"
                    value={organization}
                    items={preparedOrganizations}
                    onChange={handleOrganizationChange}
                  />
                )}
              </Paper>
            </>
            )}
          </>
        )}
      { isFetchingUser
        ? (
          <div className="user-edit__loader-section">
            <Loader />
          </div>
        )
        : (
          <>
            { userInfo && (
              <>
                { preparedManagedEvents.length > 0 && (
                  <div className="user-edit__events">
                    <div className="user-edit__events__title">
                      <NormalText
                        className="user-edit__events__title__name"
                        color="textSecondary"
                      >
                        События, которыми вы управляете
                      </NormalText>
                      <Divider className="user-edit__events__title__divider" />
                    </div>
                    <Scrollbars autoHeight autoHeightMax={450}>
                      <CardCollection
                        className="user-edit__events__card-collection"
                        items={preparedManagedEvents}
                      />
                    </Scrollbars>
                  </div>
                )}
                { preparedEvents.length > 0 && (
                  <div className="user-edit__events">
                    <div className="user-edit__events__title">
                      <NormalText
                        className="user-edit__events__title__name"
                        color="textSecondary"
                      >
                        События, на которые вы подписаны
                      </NormalText>
                      <Divider className="user-edit__events__title__divider" />
                    </div>
                    <Scrollbars autoHeight autoHeightMax={450}>
                      <CardCollection
                        className="user-edit__events__card-collection"
                        items={preparedEvents}
                      />
                    </Scrollbars>
                  </div>
                )}
              </>
            )}
          </>
        )}
    </div>
  );
};

export default UserEdit;
