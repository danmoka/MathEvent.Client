import React, {
  useEffect, useState, useCallback, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useDebouncedCallback } from 'use-debounce';
import Paper from '@material-ui/core/Paper';
import Loader from '../../_common/Loader';
import TextField from '../../_common/TextField';
import { DateField } from '../../_common/Date';
import Dropdown from '../../_common/Dropdown';
import Image from '../../_common/Image';
import { iconTypes } from '../../_common/Icon';
import Button from '../../_common/Button';
import Checkbox from '../../_common/Checkbox';
import {
  fetchEvent,
  patchEvent,
  showUploadEventAvatarModal,
} from '../../../store/actions/event';
import { fetchOrganizations } from '../../../store/actions/organization';
import { useTitle } from '../../../hooks';
import { getImageSrc } from '../../../utils/get-image-src';
import { isAbleToEditEvent } from '../../../utils/user_rights';
import { navigateToEvent } from '../../../utils/navigator';
import images from '../../../constants/images';
import './EventEdit.scss';

const prepareImage = (path, isDarkTheme) => {
  if (path) {
    return getImageSrc(path);
  }
  if (isDarkTheme) {
    return images.eventDefaultDark;
  }

  return images.eventDefault;
};

const prepareOrganizations = (organizations) => (organizations
  ? [{ value: '', name: 'Без организации' },
    ...organizations.map((organization) => ({
      value: organization.id.toString(),
      name: organization.name,
    })),
  ]
  : []);

const EventEdit = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.account);
  const { eventInfo, isFetchingEvent } = useSelector((state) => state.event);
  const { organizations } = useSelector((state) => state.organization);
  const { isDarkTheme } = useSelector((state) => state.app);

  const [eventId, setEventId] = useState(null);
  const [name, setName] = useState('');
  const [avatarPath, setAvatarPath] = useState('');
  const [description, setDesctiption] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [location, setLocation] = useState('');
  const [organization, setOrganization] = useState('');
  const [hierarchy, setHierarchy] = useState(null);

  const { id } = useParams();
  useTitle('Редактирование события');

  const isAbleToEdit = isAbleToEditEvent(userInfo, eventInfo);

  useEffect(() => {
    if (!isAbleToEdit) {
      navigateToEvent(id);
    }
  }, [dispatch, id, isAbleToEdit, userInfo]);

  useEffect(() => {
    dispatch(fetchEvent(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  useEffect(() => {
    setEventId(eventInfo.id);
    setName(eventInfo.name || '');
    setAvatarPath(eventInfo.avatarPath || '');
    setDesctiption(eventInfo.description || '');
    setStartDate(new Date(eventInfo.startDate) || new Date(Date.now()));
    setLocation(eventInfo.location || '');
    setOrganization(eventInfo.organization?.id.toString());
    setHierarchy(eventInfo.hierarchy || false);
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

  const handleNameValueChange = useDebouncedCallback((newName) => {
    setName(newName);
    handlePatchEvent([
      {
        value: newName,
        path: '/Name',
        op: 'replace',
      },
    ]);
  }, 1000);

  const handleDescriptionValueChange = useDebouncedCallback(
    (newDescription) => {
      setDesctiption(newDescription);
      handlePatchEvent([
        {
          value: newDescription,
          path: '/Description',
          op: 'replace',
        },
      ]);
    }, 1000,
  );

  const handleDateValueChange = useCallback((newStartDate) => {
    setStartDate(newStartDate);
    handlePatchEvent([
      {
        value: newStartDate,
        path: '/StartDate',
        op: 'replace',
      },
    ]);
  }, [handlePatchEvent]);

  const handleLocationValueChange = useDebouncedCallback((newLocation) => {
    setLocation(newLocation);
    handlePatchEvent([
      {
        value: newLocation,
        path: '/Location',
        op: 'replace',
      },
    ]);
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
      ]);
    },
    [handlePatchEvent],
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
      ]);
    },
    [handlePatchEvent],
  );

  return (
    <div className="event-edit">
      {isFetchingEvent
        ? (
          <div className="event-edit__loader-section">
            <Loader />
          </div>
        )
        : (
          <Paper className="event-edit__body">
            <TextField
              className="event-edit__body__control"
              label="Название"
              value={name}
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
              onChange={handleDescriptionValueChange}
            />
            <DateField
              className="event-edit__body__control"
              label="Дата и время начала"
              inputVariant="outlined"
              value={startDate}
              minDate={new Date(Date.now())}
              onChange={handleDateValueChange}
            />
            <TextField
              className="event-edit__body__control"
              label="Адрес"
              value={location}
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
              onChange={handleHierarchyValueChange}
            />
          </Paper>
        )}
    </div>
  );
};

export default EventEdit;
