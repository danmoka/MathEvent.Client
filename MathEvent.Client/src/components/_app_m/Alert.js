import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { setAlertMessage } from '../../store/actions/app';

const Alert = () => {
  const dispatch = useDispatch();
  const { alertMessage, alertSeverity } = useSelector((state) => state.app);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(!!alertMessage);
  }, [alertMessage]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setAlertMessage(''));
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={alertSeverity}
      >
        {alertMessage}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
