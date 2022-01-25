import React, {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TextField from '../_common/TextField';
import Button from '../_common/Button';
import { register } from '../../store/actions/account';
import {
  validateUserEmail,
  validateUserUsername,
  validateUserPassword,
  validateUserPasswordConfirm,
  validateUserName,
  validateUserSurname,
} from '../../utils/validation/userValidation';
import './Account.scss';

const Register = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const [emailError, setEmailError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');

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

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailError(validateUserEmail(value));
  };
  const handleUserNameChange = (value) => {
    setUserName(value);
    setUserNameError(validateUserUsername(value));
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordError(validateUserPassword(value));
  };
  const handlePasswordConfirmChange = useCallback((value) => {
    setPasswordConfirm(value);
    setConfirmError(validateUserPasswordConfirm(password, value));
  }, [password]);
  const handleNameChange = (value) => {
    setName(value);
    setNameError(validateUserName(value));
  };
  const handleSurnameChange = (value) => {
    setSurname(value);
    setSurnameError(validateUserSurname(value));
  };

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
          error={!!emailError}
          helperText={emailError}
          onChange={handleEmailChange}
        />
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
          label="Имя"
          value={name}
          error={!!nameError}
          helperText={nameError}
          onChange={handleNameChange}
        />
        <TextField
          className="account__body__control"
          label="Фамилия"
          value={surname}
          error={!!surnameError}
          helperText={surnameError}
          onChange={handleSurnameChange}
        />
        <TextField
          className="account__body__control"
          label="Пароль"
          type="password"
          value={password}
          error={!!passwordError}
          helperText={passwordError}
          onChange={handlePasswordChange}
        />
        <TextField
          className="account__body__control"
          label="Повторите пароль"
          type="password"
          value={passwordConfirm}
          error={!!confirmError}
          helperText={confirmError}
          onChange={handlePasswordConfirmChange}
        />
        <Button
          className="account__body__control"
          disabled={
            !!emailError
            || !!userNameError
            || !!passwordError
            || !!confirmError
            || !!nameError
            || !!surnameError
          }
          onClick={handleSubmit}
        >
          Регистрация
        </Button>
      </Paper>
    </div>
  );
};

export default Register;
