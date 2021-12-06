import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTitle } from '../../../hooks';
import { fetchUsers } from '../../../store/actions/user';
import UsersCollection from './UsersCollection';
import UsersSearch from './UsersSearch';
import './UsersView.scss';

const UsersView = () => {
  const dispatch = useDispatch();
  const { userSearch } = useSelector((state) => state.filters);

  useTitle('Пользователи');

  useEffect(() => {
    dispatch(fetchUsers({
      userSearch,
    }));
  }, [dispatch, userSearch]);

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
