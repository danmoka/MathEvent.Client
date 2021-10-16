import React, {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateModal, modalSizes } from '../../_common/Modal';
import { DateField } from '../../_common/Date';
import Checkbox from '../../_common/Checkbox';
import Dropdown from '../../_common/Dropdown';
import TextField from '../../_common/TextField';
import { createEvent } from '../../../store/actions/event';
import { fetchOrganizations } from '../../../store/actions/organization';
import colors from '../../../constants/colors';
import { NormalText } from '../../_common/Text/Text';
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
  const [startDate, setStartDate] = useState(null);
  const [location, setLocation] = useState('');
  const [description, setDesctiption] = useState('');
  const [organization, setOrganization] = useState('');
  const [hierarchy, setHierarchy] = useState(null);

  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  const preparedOrganizations = useMemo(
    () => prepareOrganizations(organizations),
    [organizations],
  );
  const parent = crumbs.length > 0 ? crumbs[crumbs.length - 1] : null;

  const handleNameValueChange = (value) => setName(value);

  const handleDateValueChange = (value) => setStartDate(value);

  const handleLocationValueChange = (value) => setLocation(value);

  const handleDescriptionValueChange = (value) => setDesctiption(value);

  const handleOrganizationChange = (value) => setOrganization(value);

  const handleHierarchyValueChange = (value) => setHierarchy(value || null);

  const handleCreate = useCallback(() => {
    const event = {
      Name: name,
      StartDate: startDate,
      Location: location,
      Description: description,
      OrganizationId: organization,
      ParentId: parent ? parent.id : null,
      Hierarchy: hierarchy || null,
    };

    dispatch(createEvent({ event }));
  }, [
    name,
    startDate,
    location,
    description,
    organization,
    parent,
    hierarchy,
    dispatch]);

  return (
    <CreateModal
      title="Новое событие"
      size={modalSizes.small}
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
          onChange={handleNameValueChange}
        />
        <TextField
          className="event-create__body__control"
          label="Описание"
          multiline
          rows={10}
          value={description}
          onChange={handleDescriptionValueChange}
        />
        <DateField
          className="event-create__body__control"
          inputVariant="outlined"
          value={startDate}
          minDate={new Date(Date.now())}
          onChange={handleDateValueChange}
          label="Дата и время начала"
        />
        <TextField
          className="event-create__body__control"
          label="Адрес"
          value={location}
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
