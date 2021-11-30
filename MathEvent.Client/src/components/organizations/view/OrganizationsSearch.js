import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { IconButton, iconTypes } from '../../_common/Icon';
import './OrganizationsView.scss';

const OrganizationsSearch = () => (
  <Paper
    className="organizations-search"
    component="form"
  >
    <InputBase
      className="organizations-search__input"
      placeholder="Введите название"
    />
    <IconButton
      type={iconTypes.search}
    />
  </Paper>
);

export default OrganizationsSearch;
