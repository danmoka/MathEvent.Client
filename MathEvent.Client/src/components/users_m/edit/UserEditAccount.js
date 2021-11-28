import React, {
  useCallback, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '../../_common/TextField';
import {
  patchUserAccount,
} from '../../../store/actions/user';
import './UserEdit.scss';

const UserEditAccount = ({
  accountId,
  accountName,
  accountSurname,
  email,
  username,
}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(accountName);
  const [surname, setSurname] = useState(accountSurname);

  const handlePatchUserAccount = useCallback(
    (data) => {
      dispatch(
        patchUserAccount({
          identityUserId: accountId,
          data,
        }),
      );
    },
    [dispatch, accountId],
  );

  const handleNameValueChange = useDebouncedCallback((newName) => {
    setName(newName);
    const patchDocument = [
      {
        value: newName,
        path: '/Name',
        op: 'replace',
      },
    ];
    handlePatchUserAccount(patchDocument);
  }, 1000);

  const handleSurnameValueChange = useDebouncedCallback((newSurname) => {
    setSurname(newSurname);
    const patchDocument = [
      {
        value: newSurname,
        path: '/Surname',
        op: 'replace',
      },
    ];
    handlePatchUserAccount(patchDocument);
  }, 1000);

  return (
    <Paper className="user-edit__body">
      <TextField
        className="user-edit__body__control"
        label="Email"
        value={email}
        disabled
      />
      <TextField
        className="user-edit__body__control"
        label="Логин"
        value={username}
        disabled
      />
      <TextField
        className="user-edit__body__control"
        label="Фамилия"
        value={surname}
        onChange={handleSurnameValueChange}
      />
      <TextField
        className="user-edit__body__control"
        label="Имя"
        value={name}
        onChange={handleNameValueChange}
      />
    </Paper>
  );
};

UserEditAccount.propTypes = {
  accountId: PropTypes.string,
  accountName: PropTypes.string,
  accountSurname: PropTypes.string,
  email: PropTypes.string,
  username: PropTypes.string,
};

UserEditAccount.defaultProps = {
  accountId: undefined,
  accountName: '',
  accountSurname: '',
  email: '',
  username: '',
};

export default UserEditAccount;
