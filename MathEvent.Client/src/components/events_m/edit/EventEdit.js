import React, {
  useEffect, useState, useCallback, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useDebouncedCallback } from 'use-debounce';
import Scrollbars from 'react-custom-scrollbars-2';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import Loader from '../../_common/Loader';
import TextField from '../../_common/TextField';
import { DateField } from '../../_common/Date';
import Dropdown from '../../_common/Dropdown';
import Image from '../../_common/Image';
import { IconButton, iconTypes } from '../../_common/Icon';
import Button from '../../_common/Button';
import Checkbox from '../../_common/Checkbox';
import { HugeText, SmallText } from '../../_common/Text/Text';
import List from '../../_common/List';
import EventEditFiles from './EventFilesEdit';
import {
  fetchEvent,
  patchEvent,
  showUploadEventAvatarModal,
  showEventAddManagerModal,
} from '../../../store/actions/event';
import {
  fetchOrCreateUserInfo,
  showNotAuthenticated,
} from '../../../store/actions/user';
import { fetchOrganizations } from '../../../store/actions/organization';
import { useTitle } from '../../../hooks';
import { prepareImage } from '../../../utils/get-image-src';
import { isAbleToEditEvent } from '../../../utils/user_rights';
import { navigateToUser, navigateToEvent } from '../../../utils/navigator';
import { getInitials } from '../../../utils/get_initials';
import { getLocaleDateTimeFromUTC } from '../../../utils/time';
import {
  validateEventDate,
  validateEventDescription,
  validateEventLocation,
  validateEventName,
} from '../../../utils/validation/eventValidation';
import './EventEdit.scss';

const prepareOrganizations = (organizations) => (organizations
  ? [{ value: '', name: 'Без организации' },
    ...organizations.map((organization) => ({
      value: organization.id.toString(),
      name: organization.name,
    })),
  ]
  : []);

const prepareManagers = (managers, onClick, onManagerDelete) => (managers
  ? managers.map((manager, index) => ({
    id: manager.id,
    primaryText: `${manager.name} ${manager.surname}`,
    secondaryText: manager.userName,
    avatarText: getInitials(manager.name, manager.surname),
    index: index + 1,
    onClick: () => onClick(manager),
    actions: [
      {
        id: 'delete',
        label: 'Удалить',
        icon: iconTypes.delete,
        onClick: () => onManagerDelete(manager),
      },
    ],
  }))
  : []);

const EventEdit = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, account } = useSelector((state) => state.account);
  const { userInfo } = useSelector((state) => state.user);
  const { eventInfo, isFetchingEvent } = useSelector((state) => state.event);
  const { organizations } = useSelector((state) => state.organization);
  const { isDarkTheme } = useSelector((state) => state.app);

  const [isAbleToEdit, setIsAbleToEdit] = useState(true);
  const [eventId, setEventId] = useState(null);
  const [name, setName] = useState('');
  const [avatarPath, setAvatarPath] = useState('');
  const [description, setDesctiption] = useState('');
  const [startDate, setStartDate] = useState(
    moment(Date.now())
      .add(15, 'm')
      .toDate(),
  );
  const [location, setLocation] = useState('');
  const [organization, setOrganization] = useState('');
  const [hierarchy, setHierarchy] = useState(false);

  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [dateError, setDateError] = useState('');
  const [locationError, setLocationError] = useState('');

  const { id } = useParams();
  useTitle('Редактирование события');

  useEffect(() => {
    if (account) {
      if (!userInfo || userInfo.identityUserId !== account.sub) {
        const [username, surname] = account.given_name.split(' ');
        const {
          sub: identityUserId,
          email,
        } = account;
        dispatch(fetchOrCreateUserInfo({
          identityUserId,
          email,
          name: username,
          surname,
        }));
      }
    }
  }, [dispatch, account, id, userInfo]);

  useEffect(() => {
    if (isAbleToEdit && userInfo) {
      dispatch(fetchEvent(id));
    }
  }, [dispatch, id, isAbleToEdit, userInfo]);

  useEffect(() => {
    if (eventInfo && userInfo && account) {
      setIsAbleToEdit(isAbleToEditEvent(userInfo, account, eventInfo));
    } else {
      setIsAbleToEdit(false);
    }
  }, [account, eventInfo, userInfo]);

  useEffect(() => {
    if (!isAbleToEdit) {
      navigateToEvent(id);
    }
  }, [dispatch, id, isAbleToEdit]);

  useEffect(() => {
    dispatch(fetchOrganizations({
      organizationSearch: '',
    }));
  }, [dispatch]);

  useEffect(() => {
    if (eventInfo) {
      setEventId(eventInfo.id);
      setName(eventInfo.name);
      setAvatarPath(eventInfo.avatarPath);
      setDesctiption(eventInfo.description);

      const date = new Date(getLocaleDateTimeFromUTC(eventInfo.startDate));
      setStartDate(date);
      setDateError(validateEventDate(date));

      setLocation(eventInfo.location);
      setOrganization(eventInfo.organization?.id.toString());
      setHierarchy(eventInfo.hierarchy !== null);
    }
  }, [eventInfo]);

  const preparedImage = useMemo(
    () => prepareImage(avatarPath, isDarkTheme),
    [avatarPath, isDarkTheme],
  );

  const preparedOrganizations = useMemo(
    () => prepareOrganizations(organizations),
    [organizations],
  );

  const handlePatchEvent = useCallback(
    (data) => {
      dispatch(
        patchEvent({
          eventId,
          data,
        }),
      );
    },
    [dispatch, eventId],
  );

  const handleManagerDeleteClick = useCallback(
    (user) => {
      handlePatchEvent([
        {
          value: eventInfo.managers
            .filter((m) => m.id !== user.id)
            .map((m) => m.id),
          path: '/Managers',
          op: 'replace',
        },
        {
          value: new Date(startDate).toISOString(),
          path: '/StartDate',
          op: 'replace',
        },
      ]);
    },
    [eventInfo, handlePatchEvent, startDate],
  );

  const handleUserClick = useCallback((user) => {
    if (isAuthenticated) {
      navigateToUser(user.identityUserId);
    } else {
      dispatch(showNotAuthenticated());
    }
  }, [dispatch, isAuthenticated]);

  const preparedManagers = useMemo(
    () => (eventInfo
      ? prepareManagers(
        eventInfo.managers,
        handleUserClick,
        handleManagerDeleteClick,
      )
      : []),
    [eventInfo, handleManagerDeleteClick, handleUserClick],
  );

  const handleNameValueChange = useDebouncedCallback((newName) => {
    setName(newName);
    const error = validateEventName(newName);
    setNameError(error);

    if (!error) {
      handlePatchEvent([
        {
          value: newName,
          path: '/Name',
          op: 'replace',
        },
        {
          value: new Date(startDate).toISOString(),
          path: '/StartDate',
          op: 'replace',
        },
      ]);
    }
  }, 1000);

  const handleDescriptionValueChange = useDebouncedCallback(
    (newDescription) => {
      setDesctiption(newDescription);
      const error = validateEventDescription(newDescription);
      setDescriptionError(error);

      if (!error) {
        handlePatchEvent([
          {
            value: newDescription,
            path: '/Description',
            op: 'replace',
          },
          {
            value: new Date(startDate).toISOString(),
            path: '/StartDate',
            op: 'replace',
          },
        ]);
      }
    }, 1000,
  );

  const handleDateValueChange = useCallback((newStartDate) => {
    setStartDate(newStartDate);
    const error = validateEventDate(newStartDate);
    setDateError(error);

    if (!error) {
      handlePatchEvent([
        {
          value: new Date(newStartDate).toISOString(),
          path: '/StartDate',
          op: 'replace',
        },
      ]);
    }
  }, [handlePatchEvent]);

  const handleLocationValueChange = useDebouncedCallback((newLocation) => {
    setLocation(newLocation);
    const error = validateEventLocation(newLocation);
    setLocationError(error);

    if (!error) {
      handlePatchEvent([
        {
          value: newLocation,
          path: '/Location',
          op: 'replace',
        },
        {
          value: new Date(startDate).toISOString(),
          path: '/StartDate',
          op: 'replace',
        },
      ]);
    }
  }, 1000);

  const handleOrganizationChange = useCallback(
    (newOrganization) => {
      setOrganization(newOrganization);
      handlePatchEvent([
        {
          value: newOrganization || null,
          path: '/OrganizationId',
          op: 'replace',
        },
        {
          value: new Date(startDate).toISOString(),
          path: '/StartDate',
          op: 'replace',
        },
      ]);
    },
    [handlePatchEvent, startDate],
  );

  const handleEventAvatarUpload = useCallback(() => {
    dispatch(showUploadEventAvatarModal({ eventId }));
  }, [dispatch, eventId]);

  const handleHierarchyValueChange = useCallback(
    (newValue) => {
      setHierarchy(newValue);
      handlePatchEvent([
        {
          value: newValue || null,
          path: '/Hierarchy',
          op: 'replace',
        },
        {
          value: new Date(startDate).toISOString(),
          path: '/StartDate',
          op: 'replace',
        },
      ]);
    },
    [handlePatchEvent, startDate],
  );

  const handleManagerAddClick = useCallback(() => {
    dispatch(showEventAddManagerModal());
  }, [dispatch]);

  return (
    <div className="event-edit">
      {isFetchingEvent
        ? (
          <div className="event-edit__loader-section">
            <Loader />
          </div>
        )
        : (
          <>
            { eventInfo
            && (
            <>
              <div className="event-edit__main-section">
                <Paper className="event-edit__body">
                  <TextField
                    className="event-edit__body__control"
                    label="Название"
                    value={name}
                    error={!!nameError}
                    helperText={nameError}
                    onChange={handleNameValueChange}
                  />
                  <div className="event-edit__body__image-section">
                    <Image
                      className="event-edit__body__image-section__image"
                      src={preparedImage}
                      alt={name}
                    />
                  </div>
                  <Button
                    className="event-edit__body__control"
                    startIcon={iconTypes.upload}
                    onClick={handleEventAvatarUpload}
                  >
                    Загрузить изображение
                  </Button>
                  <TextField
                    className="event-edit__body__control"
                    label="Описание"
                    multiline
                    rows={10}
                    value={description}
                    error={!!descriptionError}
                    helperText={descriptionError}
                    onChange={handleDescriptionValueChange}
                  />
                  <DateField
                    className="event-edit__body__control"
                    label="Дата и время начала"
                    inputVariant="outlined"
                    value={startDate}
                    minDate={new Date(Date.now())}
                    error={!!dateError}
                    helperText={dateError}
                    onChange={handleDateValueChange}
                  />
                  <TextField
                    className="event-edit__body__control"
                    label="Адрес"
                    value={location}
                    error={!!locationError}
                    helperText={locationError}
                    onChange={handleLocationValueChange}
                  />
                  <Dropdown
                    className="event-edit__body__control"
                    label="Организация"
                    variant="outlined"
                    value={organization}
                    items={preparedOrganizations}
                    onChange={handleOrganizationChange}
                  />
                  <Checkbox
                    className="event-edit__body__control"
                    label="Является множеством других событий"
                    value={hierarchy}
                    disabled
                    onChange={handleHierarchyValueChange}
                  />
                </Paper>
              </div>
              <div className="event-edit__manager-section">
                <Paper className="event-edit__body">
                  <section className="event-edit__managers__header-section">
                    <HugeText>
                      Менеджеры
                    </HugeText>
                    <IconButton
                      type={iconTypes.add}
                      size="small"
                      title="Добавить менеджера"
                      onClick={handleManagerAddClick}
                    />
                  </section>
                  {eventInfo.managers?.length > 0
                    ? (
                      <Scrollbars autoHide autoHeight autoHeightMax={500}>
                        <List
                          items={preparedManagers}
                        />
                      </Scrollbars>
                    )
                    : (
                      <SmallText>
                        Менеджеры отсутствуют
                      </SmallText>
                    )}
                </Paper>
              </div>
              <EventEditFiles className="event-edit-files" />
            </>
            )}
          </>
        )}
    </div>
  );
};

export default EventEdit;
