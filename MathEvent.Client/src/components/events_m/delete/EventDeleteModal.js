import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteModal } from '../../_common/Modal';
import { deleteEvent } from '../../../store/actions/event';

const EventDeleteModal = () => {
  const dispatch = useDispatch();
  const { event } = useSelector((state) => state.modal.modalProps);

  const handleEventDelete = useCallback(() => {
    dispatch(deleteEvent({ eventId: event.id }));
  }, [dispatch, event]);

  return (
    <DeleteModal
      title={event.name}
      deleteText="Вы действительно хотите удалить событие?"
      onDelete={handleEventDelete}
    />
  );
};

export default EventDeleteModal;
