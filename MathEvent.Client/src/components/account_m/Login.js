import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Button, { buttonTypes, colors } from '../_common/Button';
import TextField from '../_common/TextField';
import { fetchTokens } from '../../store/actions/account';
import {
  navigateToEvents,
  navigateToForgotPassword,
} from '../../utils/navigator';
import {
  validateUserUsername,
  validateUserPassword,
} from '../../utils/validation/userValidation';
import { useTitle } from '../../hooks';
import './Account.scss';

const Login = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [userPasswordError, setUserPasswordError] = useState('');

  useTitle('Вход');

  const clearFields = () => {
    setUserName('');
    setPassword('');
  };

  const handleSubmit = useCallback(() => {
    const credentials = {
      userName,
      password,
      successAction: () => { navigateToEvents(); },
    };
    dispatch(fetchTokens(credentials));
    clearFields();
  }, [dispatch, password, userName]);

  const handleForgetPasswordClick = useCallback(() => {
    navigateToForgotPassword();
  }, []);

  const handleUserNameChange = (value) => {
    setUserName(value);
    setUserNameError(validateUserUsername(value));
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
    setUserPasswordError(validateUserPassword(value));
  };

  return (
    <div className="account">
      <Paper className="account__body">
        <TextField
          className="account__body__control"
          label="Логин"
          value={userName}
          error={!!userNameError}
          helperText={userNameError}
          onChange={handleUserNameChange}
        />
        <TextField
          className="account__body__control"
          label="Пароль"
          type="password"
          value={password}
          error={!!userPasswordError}
          helperText={userPasswordError}
          onChange={handlePasswordChange}
        />
        <Button
          className="account__body__control"
          disabled={!!userNameError || !!userPasswordError}
          onClick={handleSubmit}
        >
          Войти
        </Button>
        <Button
          className="account__body__control"
          type={buttonTypes.text}
          color={colors.inherit}
          onClick={handleForgetPasswordClick}
        >
          Забыли пароль?
        </Button>
      </Paper>
    </div>
  );
};

export default Login;
