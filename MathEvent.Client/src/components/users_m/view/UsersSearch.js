import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { IconButton, iconTypes } from '../../_common/Icon';
import { setUserSearch } from '../../../store/actions/filters';
import './UsersView.scss';

const UsersSearch = () => {
  const dispatch = useDispatch();
  const { userSearch } = useSelector((state) => state.filters);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    if (userSearch) {
      setSearchString(userSearch);
    }
  }, [userSearch]);

  const handleSearchStringChange = useCallback((event) => {
    const { value } = event.target;
    setSearchString(value);

    if (!value) {
      dispatch(setUserSearch(value));
    }
  }, [dispatch]);

  const handleSearchButtonClick = useCallback(() => {
    dispatch(setUserSearch(searchString));
  }, [dispatch, searchString]);

  const onKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      dispatch(setUserSearch(searchString));
    }
  }, [dispatch, searchString]);

  return (
    <Paper
      className="users-search"
    >
      <InputBase
        className="users-search__input"
        placeholder="Введите фамилию"
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

export default UsersSearch;
