import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { IconButton, iconTypes } from '../../_common/Icon';
import { setOrganizationSearch } from '../../../store/actions/filters';
import './OrganizationsView.scss';

const OrganizationsSearch = () => {
  const dispatch = useDispatch();
  const { organizationSearch } = useSelector((state) => state.filters);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    if (organizationSearch) {
      setSearchString(organizationSearch);
    }
  }, [organizationSearch]);

  const handleSearchStringChange = useCallback((event) => {
    const { value } = event.target;
    setSearchString(value);

    if (!value) {
      dispatch(setOrganizationSearch(value));
    }
  }, [dispatch]);

  const handleSearchButtonClick = useCallback(() => {
    dispatch(setOrganizationSearch(searchString));
  }, [dispatch, searchString]);

  return (
    <Paper
      className="organizations-search"
      component="form"
    >
      <InputBase
        className="organizations-search__input"
        placeholder="Введите название"
        value={searchString}
        onChange={handleSearchStringChange}
      />
      <IconButton
        type={iconTypes.search}
        onClick={handleSearchButtonClick}
      />
    </Paper>
  );
};

export default OrganizationsSearch;
