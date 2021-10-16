import React, {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TextField from '../_common/TextField';
import Button from '../_common/Button';
import Dropdown from '../_common/Dropdown';
import { register } from '../../store/actions/user';
import { fetchOrganizations } from '../../store/actions/organization';
import './Account.scss';

const prepareOrganizations = (organizations) => [
  { value: '', name: 'Без организации' },
  ...organizations.map((organization) => ({
    value: organization.id.toString(),
    name: organization.name,
  })),
];

const Register = () => {
  const dispatch = useDispatch();
  const { organizations } = useSelector((state) => state.organization);

  const preparedOrganizations = useMemo((
  ) => prepareOrganizations(organizations), [organizations]);

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setpasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [organization, setOrganization] = useState('');

  const clearFields = () => {
    setEmail('');
    setUserName('');
    setPassword('');
    setpasswordConfirm('');
    setName('');
    setSurname('');
    setOrganization('');
  };

  useEffect(() => {
    clearFields();
    dispatch(fetchOrganizations());
  }, [dispatch]);

  const handleEmailChange = (value) => setEmail(value);
  const handleUserNameChange = (value) => setUserName(value);
  const handlePasswordChange = (value) => setPassword(value);
  const handlepasswordConfirmChange = (value) => setpasswordConfirm(value);
  const handleNameChange = (value) => setName(value);
  const handleSurnameChange = (value) => setSurname(value);
  const handleOrganizationChange = (value) => setOrganization(value);

  const handleSubmit = useCallback(() => {
    const credentials = {
      email,
      userName,
      password,
      passwordConfirm,
      name,
      surname,
      organizationId: organization || null,
    };
    dispatch(register(credentials));
  }, [
    dispatch,
    email,
    name,
    organization,
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
          onChange={handlepasswordConfirmChange}
        />
        <Dropdown
          className="account__body__control"
          label="Организация"
          variant="outlined"
          value={organization}
          items={preparedOrganizations}
          onChange={handleOrganizationChange}
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
