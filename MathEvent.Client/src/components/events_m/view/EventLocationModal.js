import React from 'react';
import { useSelector } from 'react-redux';
import { ShowModal, modalSizes } from '../../_common/Modal';
import Location from '../../_common/Map';
import { NormalText } from '../../_common/Text/Text';

const EventLocationModal = () => {
  const { position } = useSelector((state) => state.modal.modalProps);

  return (
    <ShowModal title="Адрес" size={modalSizes.small}>
      {position
        ? (
          <Location
            location={[position.y, position.x]}
            label={position.label}
          />
        )
        : (<NormalText>Не удалось определить адрес на карте</NormalText>)}
    </ShowModal>
  );
};

export default EventLocationModal;
