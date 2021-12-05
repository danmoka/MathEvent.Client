import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { IconButton, iconTypes } from '../../_common/Icon';
import './UsersView.scss';

const UsersSearch = () => (
  <Paper
    className="users-search"
    component="form"
  >
    <InputBase
      className="users-search__input"
      placeholder="Поиск"
    />
    <IconButton
      type={iconTypes.search}
    />
  </Paper>
);

export default UsersSearch;
