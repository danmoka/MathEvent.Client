import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { hideModal } from '../../../store/actions/modal';
import modalSizes from '../../../constants/modal-sizes';

const BorderlessModal = ({ children }) => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(hideModal());

  return (
    <Dialog maxWidth={modalSizes.large} onClose={handleClose} open>
      <div
        onClick={handleClose}
        aria-hidden="true"
      >
        {children}
      </div>
    </Dialog>
  );
};

BorderlessModal.propTypes = {
  children: PropTypes.element,
};

BorderlessModal.defaultProps = {
  children: <></>,
};

export default BorderlessModal;
