import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTitle } from '../../../hooks';
import { fetchUsers } from '../../../store/actions/user';
import UsersCollection from './UsersCollection';
import UsersSearch from './UsersSearch';
import './UsersView.scss';

const UsersView = () => {
  const dispatch = useDispatch();

  useTitle('Пользователи');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <div className="users-view__search-section">
        <UsersSearch />
      </div>
      <div className="users-view__collection-section">
        <UsersCollection />
      </div>
    </div>
  );
};

export default UsersView;
