import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { IconButton, iconTypes } from '../../_common/Icon';
import './EventsView.scss';

const EventsSearch = () => (
  <Paper
    className="events-search"
    component="form"
  >
    {/* <IconButton
        type={iconTypes.menu}
      /> */}
    <InputBase
      className="events-search__input"
      placeholder="Поиск"
    />
    <IconButton
      type={iconTypes.search}
    />
  </Paper>
);

export default EventsSearch;
