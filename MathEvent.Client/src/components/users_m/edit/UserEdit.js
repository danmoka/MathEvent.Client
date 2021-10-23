import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useDebouncedCallback } from 'use-debounce';
import Paper from '@material-ui/core/Paper';
import Loader from '../../_common/Loader';
import TextField from '../../_common/TextField';
import { patchUser, fetchUser } from '../../../store/actions/user';
import { fetchOrganizations } from '../../../store/actions/organization';
import { navigateToUser } from '../../../utils/navigator';
import { isAbleToEditUser } from '../../../utils/user_rights';
import { useTitle } from '../../../hooks';
import './UserEdit.scss';

const UserEdit = () => {
  const dispatch = useDispatch();
  const {
    userInfo: account,
  } = useSelector((state) => state.account);
  const { userInfo, isFetchingUser } = useSelector((state) => state.user);

  const [isAbleToEdit, setIsAbleToEdit] = useState(true);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');

  const { id } = useParams();
  useTitle('Редактирование пользователя');

  useEffect(() => {
    if (isAbleToEdit && account) {
      dispatch(fetchUser(id));
    }
  }, [account, dispatch, id, isAbleToEdit]);

  useEffect(() => {
    if (userInfo && account) {
      setIsAbleToEdit(isAbleToEditUser(account, userInfo));
    }
  }, [account, userInfo]);

  useEffect(() => {
    if (!isAbleToEdit) {
      navigateToUser(id);
    }
  }, [dispatch, id, isAbleToEdit]);

  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      setUserId(userInfo.id);
      setName(userInfo.name);
    }
  }, [userInfo]);

  const handlePatchUser = useCallback(
    (data) => {
      dispatch(
        patchUser({
          userId,
          data,
        }),
      );
    },
    [dispatch, userId],
  );

  const handleNameValueChange = useDebouncedCallback((newName) => {
    setName(newName);
    handlePatchUser([
      {
        value: newName,
        path: '/Name',
        op: 'replace',
      },
    ]);
  }, 1000);

  return (
    <div className="user-edit">
      { isFetchingUser
        ? (
          <div className="user-edit__loader-section">
            <Loader />
          </div>
        )
        : (
          <>
            { userInfo
          && (
            <>
              <Paper className="user-edit__body">
                <TextField
                  className="user-edit__body__control"
                  label="Имя"
                  value={name}
                  onChange={handleNameValueChange}
                />
              </Paper>
            </>
          )}
          </>
        )}
    </div>
  );
};

export default UserEdit;
