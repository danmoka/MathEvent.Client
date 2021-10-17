import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button, { buttonTypes } from '../Button';
import { IconButton, iconTypes } from '../Icon';
import { HugeText, NormalText } from '../Text/Text';
import { hideModal } from '../../../store/actions/modal';
import modalSizes from '../../../constants/modal-sizes';
import './Modal.scss';

const DeleteModal = ({
  deleteText,
  deleteButtonText,
  size,
  title,
  onDelete,
}) => {
  const dispatch = useDispatch();
  const handleClose = useCallback(() => {
    dispatch(hideModal());
  }, [dispatch]);

  return (
    <Dialog maxWidth={size} onClose={handleClose} fullWidth open>
      <DialogTitle className="modal-common__header" disableTypography>
        <HugeText>{title}</HugeText>
        <IconButton type={iconTypes.close} onClick={handleClose} />
      </DialogTitle>
      <DialogContent className="modal-common__content">
        <NormalText>{deleteText}</NormalText>
      </DialogContent>
      <DialogActions>
        <Button type={buttonTypes.text} onClick={handleClose}>Отмена</Button>
        <Button
          onClick={onDelete}
        >
          {deleteButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteModal.propTypes = {
  deleteText: PropTypes.string,
  deleteButtonText: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.string,
  onDelete: PropTypes.func,
};

DeleteModal.defaultProps = {
  deleteText: '',
  deleteButtonText: 'Удалить',
  size: modalSizes.small,
  title: 'Удаление',
  onDelete: () => {},
};

export default DeleteModal;
