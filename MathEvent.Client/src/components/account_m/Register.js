import React, {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TextField from '../_common/TextField';
import Button from '../_common/Button';
import { register } from '../../store/actions/account';
import './Account.scss';

const Register = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const clearFields = () => {
    setEmail('');
    setUserName('');
    setPassword('');
    setPasswordConfirm('');
    setName('');
    setSurname('');
  };

  useEffect(() => {
    clearFields();
  }, [dispatch]);

  const handleEmailChange = (value) => setEmail(value);
  const handleUserNameChange = (value) => setUserName(value);
  const handlePasswordChange = (value) => setPassword(value);
  const handlePasswordConfirmChange = (value) => setPasswordConfirm(value);
  const handleNameChange = (value) => setName(value);
  const handleSurnameChange = (value) => setSurname(value);

  const handleSubmit = useCallback(() => {
    const credentials = {
      email,
      userName,
      password,
      passwordConfirm,
      name,
      surname,
    };
    dispatch(register(credentials));
  }, [
    dispatch,
    email,
    name,
    password,
    passwordConfirm,
    surname,
    userName]);

  return (
    <div className="account">
      <Paper className="account__body">
        <TextField
          className="account__body__control"
          label="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          className="account__body__control"
          label="Логин"
          value={userName}
          onChange={handleUserNameChange}
        />
        <TextField
          className="account__body__control"
          label="Имя"
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          className="account__body__control"
          label="Фамилия"
          value={surname}
          onChange={handleSurnameChange}
        />
        <TextField
          className="account__body__control"
          label="Пароль"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <TextField
          className="account__body__control"
          label="Повторите пароль"
          type="password"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
        />
        <Button
          className="account__body__control"
          onClick={handleSubmit}
        >
          Регистрация
        </Button>
      </Paper>
    </div>
  );
};

export default Register;
