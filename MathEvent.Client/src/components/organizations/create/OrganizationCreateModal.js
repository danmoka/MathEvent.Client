import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateModal, modalSizes } from '../../_common/Modal';
import TextField from '../../_common/TextField';
import { createOrganization } from '../../../store/actions/organization';
import './OrganizationCreate.scss';

const OrganizationCreateModal = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [itn, setITN] = useState('');

  const handleNameValueChange = (value) => setName(value);

  const handleITNValueChange = (value) => setITN(value);

  const handleCreate = useCallback(() => {
    const organization = {
      name,
      itn,
    };

    dispatch(createOrganization(organization));
  }, [dispatch, name, itn]);

  return (
    <CreateModal
      title="Новая организация"
      size={modalSizes.small}
      onCreate={handleCreate}
    >
      <div className="organization-create__body">
        <TextField
          className="organization-create__body__control"
          label="Название"
          value={name}
          onChange={handleNameValueChange}
        />
        <TextField
          className="organization-create__body__control"
          label="ИНН"
          multiline
          value={itn}
          onChange={handleITNValueChange}
        />
      </div>
    </CreateModal>
  );
};

export default OrganizationCreateModal;
