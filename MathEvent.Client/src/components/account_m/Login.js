import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Button from '../_common/Button';
import TextField from '../_common/TextField';
import { fetchTokens } from '../../store/actions/account';
import { navigateToHome } from '../../utils/navigator';
import { useTitle } from '../../hooks';
import './Account.scss';

const Login = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  useTitle('Вход');

  const clearFields = () => {
    setUserName('');
    setPassword('');
  };

  const handleSubmit = useCallback(() => {
    const credentials = {
      userName,
      password,
      successAction: () => { navigateToHome(); },
    };
    dispatch(fetchTokens(credentials));
    clearFields();
  }, [dispatch, password, userName]);

  const handleUserNameChange = (value) => setUserName(value);
  const handlePasswordChange = (value) => setPassword(value);

  return (
    <div className="account">
      <Paper className="account__body">
        <TextField
          className="account__body__control"
          label="Логин"
          value={userName}
          onChange={handleUserNameChange}
        />
        <TextField
          className="account__body__control"
          label="Пароль"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          className="account__body__control"
          onClick={handleSubmit}
        >
          Войти
        </Button>
      </Paper>
    </div>
  );
};

export default Login;
