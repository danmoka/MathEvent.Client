import React, {
  useEffect, useCallback, useState, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useDebouncedCallback } from 'use-debounce';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Paper from '@material-ui/core/Paper';
import Loader from '../../_common/Loader';
import TextField from '../../_common/TextField';
import Dropdown from '../../_common/Dropdown';
import CardCollection from '../../_common/CardCollection';
import { iconTypes, IconButton } from '../../_common/Icon';
import { HugeText } from '../../_common/Text/Text';
import { patchUser, fetchUser } from '../../../store/actions/user';
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
    userInfo: account,
  } = useSelector((state) => state.account);
  const { userInfo, isFetchingUser } = useSelector((state) => state.user);
  const { organizations } = useSelector((state) => state.organization);
  const { isDarkTheme } = useSelector((state) => state.app);

  const [isAbleToEdit, setIsAbleToEdit] = useState(true);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [organization, setOrganization] = useState('');

  const { id } = useParams();
  useTitle('Редактирование пользователя');

  useEffect(() => {
    if (isAbleToEdit && account) {
      dispatch(fetchUser(id));
    }
  }, [account, dispatch, id, isAbleToEdit]);

  useEffect(() => {
    if (userInfo && account) {
      setIsAbleToEdit(isAbleToEditUser(account, userInfo));
    }
  }, [account, userInfo]);

  useEffect(() => {
    if (!isAbleToEdit) {
      navigateToUser(id);
    }
  }, [dispatch, id, isAbleToEdit]);

  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      setUserId(userInfo.id);
      setName(userInfo.name);
      setSurname(userInfo.surname);
      setEmail(userInfo.email);
      setUsername(userInfo.userName);
      setPatronymic(userInfo.patronymic);
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
        (event) => [
          {
            id: 'edit',
            label: 'Редактировать',
            icon: iconTypes.edit,
            onClick: () => navigateToEventEdit(event.id),
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

  const handlePatchUser = useCallback(
    (data) => {
      dispatch(
        patchUser({
          userId,
          data,
        }),
      );
    },
    [dispatch, userId],
  );

  const handleNameValueChange = useDebouncedCallback((newName) => {
    setName(newName);
    handlePatchUser([
      {
        value: newName,
        path: '/Name',
        op: 'replace',
      },
    ]);
  }, 1000);

  const handleSurnameValueChange = useDebouncedCallback((newSurname) => {
    setSurname(newSurname);
    handlePatchUser([
      {
        value: newSurname,
        path: '/Surname',
        op: 'replace',
      },
    ]);
  }, 1000);

  const handleEmailValueChange = useDebouncedCallback((newEmail) => {
    setEmail(newEmail);
    handlePatchUser([
      {
        value: newEmail,
        path: '/Email',
        op: 'replace',
      },
    ]);
  }, 1000);

  const handleUsernameValueChange = useDebouncedCallback((newUsername) => {
    setUsername(newUsername);
    handlePatchUser([
      {
        value: newUsername,
        path: '/UserName',
        op: 'replace',
      },
    ]);
  }, 1000);

  const handlePatronymicValueChange = useDebouncedCallback((newPatronymic) => {
    setUsername(newPatronymic);
    handlePatchUser([
      {
        value: newPatronymic,
        path: '/Patronymic',
        op: 'replace',
      },
    ]);
  }, 1000);

  const handleOrganizationChange = useCallback((newOrganization) => {
    setOrganization(newOrganization);
    handlePatchUser([
      {
        value: newOrganization || null,
        path: '/OrganizationId',
        op: 'replace',
      },
    ]);
  }, [handlePatchUser]);

  return (
    <div className="user-edit">
      { isFetchingUser
        ? (
          <div className="user-edit__loader-section">
            <Loader />
          </div>
        )
        : (
          <>
            { userInfo
          && (
            <>
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
              <Paper className="user-edit__body">
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
                  label="Отчество"
                  value={patronymic}
                  onChange={handlePatronymicValueChange}
                />
                <TextField
                  className="user-edit__body__control"
                  label="Email"
                  value={email}
                  onChange={handleEmailValueChange}
                />
                <TextField
                  className="user-edit__body__control"
                  label="Логин"
                  value={username}
                  onChange={handleUsernameValueChange}
                />
                <Dropdown
                  className="user-edit__body__control"
                  label="Организация"
                  variant="outlined"
                  value={organization}
                  items={preparedOrganizations}
                  onChange={handleOrganizationChange}
                />
              </Paper>
              <div className="user-edit__events">
                <Paper className="user-edit__events__header">
                  <HugeText>
                    События, которыми вы управляете
                  </HugeText>
                </Paper>
                <Scrollbars autoHeight autoHeightMax={450}>
                  <CardCollection
                    className="user-edit__events__card-collection"
                    items={preparedManagedEvents}
                  />
                </Scrollbars>
              </div>
              <div className="user-edit__events">
                <Paper className="user-edit__events__header">
                  <HugeText>
                    События, на которые вы подписаны
                  </HugeText>
                </Paper>
                <Scrollbars autoHeight autoHeightMax={450}>
                  <CardCollection
                    className="user-edit__events__card-collection"
                    items={preparedEvents}
                  />
                </Scrollbars>
              </div>
            </>
          )}
          </>
        )}
    </div>
  );
};

export default UserEdit;
