import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Paper from '@material-ui/core/Paper';
import Button from '../_common/Button';
import TextField from '../_common/TextField';
import { NormalText } from '../_common/Text/Text';
import { forgotPasswordReset } from '../../store/actions/account';
import { useTitle } from '../../hooks';
import './Account.scss';

const ForgotPasswordReset = () => {
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { email } = useParams();
  useTitle('Восстановление пароля');

  const handleCodeChange = (newCode) => setCode(newCode);

  const handlePasswordChange = (newPassword) => setPassword(newPassword);

  const handlePasswordConfirmChange = (
    newPasswordConfirm,
  ) => setPasswordConfirm(newPasswordConfirm);

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
          onChange={handlePasswordChange}
        />
        <TextField
          className="account__body__control"
          label="Подтвердите новый пароль"
          type="password"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
        />
        <Button
          className="account__body__control"
          onClick={handleSubmit}
        >
          Сменить пароль
        </Button>
      </Paper>
    </div>
  );
};

export default ForgotPasswordReset;
