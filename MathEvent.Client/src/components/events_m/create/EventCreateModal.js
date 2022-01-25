import React, {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { CreateModal, modalSizes } from '../../_common/Modal';
import { DateField } from '../../_common/Date';
import Checkbox from '../../_common/Checkbox';
import Dropdown from '../../_common/Dropdown';
import TextField from '../../_common/TextField';
import { createEvent } from '../../../store/actions/event';
import { fetchOrganizations } from '../../../store/actions/organization';
import colors from '../../../constants/colors';
import { NormalText } from '../../_common/Text/Text';
import {
  validateEventDate,
  validateEventDescription,
  validateEventLocation,
  validateEventName,
} from '../../../utils/validation/eventValidation';
import './EventCreate.scss';

const prepareOrganizations = (organizations) => [
  { value: '', name: 'Без организации' },
  ...organizations.map((organization) => ({
    value: organization.id.toString(),
    name: organization.name,
  })),
];

const EventCreateModal = () => {
  const dispatch = useDispatch();
  const { organizations } = useSelector((state) => state.organization);
  const { crumbs } = useSelector((state) => state.event);

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(
    moment(Date.now())
      .add(15, 'm')
      .toDate(),
  );
  const [location, setLocation] = useState('');
  const [description, setDesctiption] = useState('');
  const [organization, setOrganization] = useState('');
  const [hierarchy, setHierarchy] = useState(false);

  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [dateError, setDateError] = useState('');
  const [locationError, setLocationError] = useState('');

  useEffect(() => {
    dispatch(fetchOrganizations({
      organizationSearch: '',
    }));
  }, [dispatch]);

  const preparedOrganizations = useMemo(
    () => prepareOrganizations(organizations),
    [organizations],
  );
  const parent = crumbs.length > 0 ? crumbs[crumbs.length - 1] : null;

  const handleNameValueChange = (value) => {
    setName(value);
    setNameError(validateEventName(value));
  };

  const handleDateValueChange = (value) => {
    setStartDate(value);
    setDateError(validateEventDate(value));
  };

  const handleLocationValueChange = (value) => {
    setLocation(value);
    setLocationError(validateEventLocation(value));
  };

  const handleDescriptionValueChange = (value) => {
    setDesctiption(value);
    setDescriptionError(validateEventDescription(value));
  };

  const handleOrganizationChange = (value) => setOrganization(value);

  const handleHierarchyValueChange = (value) => setHierarchy(value);

  const handleCreate = useCallback(() => {
    const event = {
      Name: name,
      StartDate: new Date(startDate).toISOString(),
      Location: location,
      Description: description,
      OrganizationId: organization,
      ParentId: parent ? parent.id : null,
      Hierarchy: hierarchy || null,
    };

    dispatch(createEvent({ event }));
  }, [
    dispatch,
    name,
    startDate,
    location,
    description,
    organization,
    parent,
    hierarchy]);

  return (
    <CreateModal
      title="Новое событие"
      size={modalSizes.small}
      disabledOk={
        !!nameError
        || !!descriptionError
        || !!dateError
        || !!locationError
      }
      onCreate={handleCreate}
    >
      <div className="event-create__body">
        <NormalText
          color={colors.primary}
        >
          {`Событие будет создано в ${parent ? parent.name : 'Корне'}`}
        </NormalText>
        <TextField
          className="event-create__body__control"
          label="Название"
          value={name}
          error={!!nameError}
          helperText={nameError}
          onChange={handleNameValueChange}
        />
        <TextField
          className="event-create__body__control"
          label="Описание"
          multiline
          rows={10}
          value={description}
          error={!!descriptionError}
          helperText={descriptionError}
          onChange={handleDescriptionValueChange}
        />
        <DateField
          className="event-create__body__control"
          inputVariant="outlined"
          value={startDate}
          minDate={new Date(Date.now())}
          error={!!dateError}
          helperText={dateError}
          onChange={handleDateValueChange}
          label="Дата и время начала"
        />
        <TextField
          className="event-create__body__control"
          label="Адрес"
          value={location}
          error={!!locationError}
          helperText={locationError}
          onChange={handleLocationValueChange}
        />
        <Dropdown
          className="event-create__body__control"
          label="Организация"
          variant="outlined"
          value={organization}
          items={preparedOrganizations}
          onChange={handleOrganizationChange}
        />
        <Checkbox
          className="event-create__body__control"
          label="Является множеством других событий"
          value={hierarchy}
          onChange={handleHierarchyValueChange}
        />
      </div>
    </CreateModal>
  );
};

export default EventCreateModal;
