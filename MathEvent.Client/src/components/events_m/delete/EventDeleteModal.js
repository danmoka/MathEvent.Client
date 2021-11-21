import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteModal } from '../../_common/Modal';
import { deleteEvent } from '../../../store/actions/event';

const EventDeleteModal = () => {
  const dispatch = useDispatch();
  const { id, name } = useSelector((state) => state.modal.modalProps);

  const handleEventDelete = useCallback(() => {
    dispatch(deleteEvent({ eventId: id }));
  }, [dispatch, id]);

  return (
    <DeleteModal
      title={name}
      deleteText="Вы действительно хотите удалить событие?"
      onDelete={handleEventDelete}
    />
  );
};

export default EventDeleteModal;
