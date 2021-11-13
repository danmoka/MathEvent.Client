import React from 'react';
import { useSelector } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars-2';
import { BorderlessModal } from '../Modal';
import './ZoomImage.scss';

const ZoomImageModal = () => {
  const { src, alt } = useSelector((state) => state.modal.modalProps);

  return (
    <BorderlessModal>
      <Scrollbars autoHeight autoHide autoHeightMax={window.innerHeight - 100}>
        <img className="zoom-image w-100" src={src} alt={alt} />
      </Scrollbars>
    </BorderlessModal>
  );
};

export default ZoomImageModal;
