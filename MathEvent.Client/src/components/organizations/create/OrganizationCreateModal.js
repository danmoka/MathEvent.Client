import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateModal, modalSizes } from '../../_common/Modal';
import TextField from '../../_common/TextField';
import { createOrganization } from '../../../store/actions/organization';
import {
  validateOrganizationITN,
  validateOrganizationName,
} from '../../../utils/validation/organizationValidation';
import './OrganizationCreate.scss';

const OrganizationCreateModal = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [itn, setITN] = useState('');

  const [nameError, setNameError] = useState('');
  const [itnError, setITNError] = useState('');

  const handleNameValueChange = (value) => {
    setName(value);
    setNameError(validateOrganizationName(value));
  };

  const handleITNValueChange = (value) => {
    setITN(value);
    setITNError(validateOrganizationITN(value));
  };

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
      disabledOk={!!nameError || !!itnError}
      onCreate={handleCreate}
    >
      <div className="organization-create__body">
        <TextField
          className="organization-create__body__control"
          label="Название"
          value={name}
          error={!!nameError}
          helperText={nameError}
          onChange={handleNameValueChange}
        />
        <TextField
          className="organization-create__body__control"
          label="ИНН"
          multiline
          value={itn}
          error={!!itnError}
          helperText={itnError}
          onChange={handleITNValueChange}
        />
      </div>
    </CreateModal>
  );
};

export default OrganizationCreateModal;
