import React from 'react';
import { Route } from 'react-router-dom';
import UserEdit from '../edit/UserEdit';
import UsersView from './UsersView';
import User from './User';
import routes from '../../../utils/routes';

const Users = () => (
  <>
    <Route
      path={routes.users.main}
      exact
      render={() => <UsersView />}
    />
    <Route
      path={`${routes.users.user(':id')}`}
      exact
      render={() => <User />}
    />
    <Route
      path={`${routes.users.edit(':id')}`}
      exact
      render={() => <UserEdit />}
    />
  </>
);

export default Users;
