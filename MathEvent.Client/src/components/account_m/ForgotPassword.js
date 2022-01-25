import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Button from '../_common/Button';
import TextField from '../_common/TextField';
import { useTitle } from '../../hooks';
import { forgotPassword } from '../../store/actions/account';
import { validateUserEmail } from '../../utils/validation/userValidation';
import './Account.scss';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  useTitle('Забыли пароль');

  const handleEmailChange = useCallback((newEmail) => {
    setEmail(newEmail);
    setEmailError(validateUserEmail(newEmail));
  }, []);

  const handleSubmit = useCallback(() => {
    dispatch(forgotPassword({ email }));
  }, [dispatch, email]);

  return (
    <div className="account">
      <Paper className="account__body">
        <TextField
          className="account__body__control"
          label="Введите Email"
          value={email}
          error={!!emailError}
          helperText={emailError}
          onChange={handleEmailChange}
        />
        <Button
          className="account__body__control"
          disabled={!!emailError}
          onClick={handleSubmit}
        >
          Отправить код
        </Button>
      </Paper>
    </div>
  );
};

export default ForgotPassword;
