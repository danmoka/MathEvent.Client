import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Paper from '@material-ui/core/Paper';
import Button from '../_common/Button';
import TextField from '../_common/TextField';
import { NormalText } from '../_common/Text/Text';
import { forgotPasswordReset } from '../../store/actions/account';
import { useTitle } from '../../hooks';
import {
  validateUserPassword,
  validateUserPasswordConfirm,
} from '../../utils/validation/userValidation';
import './Account.scss';

const ForgotPasswordReset = () => {
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const { email } = useParams();
  useTitle('Восстановление пароля');

  const handleCodeChange = (newCode) => setCode(newCode);

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordError(validateUserPassword(value));
  };

  const handlePasswordConfirmChange = useCallback((value) => {
    setPasswordConfirm(value);
    setConfirmError(validateUserPasswordConfirm(password, value));
  }, [password]);

  const handleSubmit = useCallback(() => {
    dispatch(forgotPasswordReset({
      token: code,
      email,
      password,
      passwordConfirm,
    }));
  }, [dispatch, code, email, password, passwordConfirm]);

  return (
    <div className="account">
      <Paper className="account__body">
        <NormalText>
          {email}
        </NormalText>
        <TextField
          className="account__body__control"
          label="Код из сообщения"
          value={code}
          onChange={handleCodeChange}
        />
        <TextField
          className="account__body__control"
          label="Введите новый пароль"
          type="password"
          value={password}
          error={!!passwordError}
          helperText={passwordError}
          onChange={handlePasswordChange}
        />
        <TextField
          className="account__body__control"
          label="Подтвердите новый пароль"
          type="password"
          value={passwordConfirm}
          error={!!confirmError}
          helperText={confirmError}
          onChange={handlePasswordConfirmChange}
        />
        <Button
          className="account__body__control"
          disabled={!!passwordError || !!confirmError}
          onClick={handleSubmit}
        >
          Сменить пароль
        </Button>
      </Paper>
    </div>
  );
};

export default ForgotPasswordReset;
