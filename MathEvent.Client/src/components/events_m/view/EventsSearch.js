import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { IconButton, iconTypes } from '../../_common/Icon';
import { setEventSearch } from '../../../store/actions/filters';
import './EventsView.scss';

const EventsSearch = () => {
  const dispatch = useDispatch();
  const { eventSearch } = useSelector((state) => state.filters);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    if (eventSearch) {
      setSearchString(eventSearch);
    }
  }, [eventSearch]);

  const handleSearchStringChange = useCallback((event) => {
    const { value } = event.target;
    setSearchString(value);

    if (!value) {
      dispatch(setEventSearch(value));
    }
  }, [dispatch]);

  const handleSearchButtonClick = useCallback(() => {
    dispatch(setEventSearch(searchString));
  }, [dispatch, searchString]);

  const onKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      dispatch(setEventSearch(searchString));
    }
  }, [dispatch, searchString]);

  return (
    <Paper
      className="events-search"
    >
      <InputBase
        className="events-search__input"
        placeholder="Поиск"
        value={searchString}
        onChange={handleSearchStringChange}
        onKeyPress={onKeyPress}
      />
      <IconButton
        type={iconTypes.search}
        onClick={handleSearchButtonClick}
      />
    </Paper>
  );
};

export default EventsSearch;
