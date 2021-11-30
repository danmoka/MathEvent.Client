import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteModal } from '../../_common/Modal';
import { deleteOrganization } from '../../../store/actions/organization';

const OrganizationDeleteModal = () => {
  const dispatch = useDispatch();
  const { id, name } = useSelector((state) => state.modal.modalProps);

  const handleOrganizationDelete = useCallback(() => {
    dispatch(deleteOrganization(id));
  }, [dispatch, id]);

  return (
    <DeleteModal
      title={name}
      deleteText="Вы действительно хотите удалить организацию?"
      onDelete={handleOrganizationDelete}
    />
  );
};

export default OrganizationDeleteModal;
