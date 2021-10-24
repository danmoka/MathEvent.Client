import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Dropdown from '../../_common/Dropdown';
import Loader from '../../_common/Loader';
import {
  fetchSortByValues, selectSortByValue,
} from '../../../store/actions/filters';
import './EventsView.scss';

const prepareSortValues = (sortByDateValues) => (
  sortByDateValues
    ? sortByDateValues.map((v) => ({
      value: v.id.toString(),
      name: v.name,
    }))
    : []
);

const EventsSort = () => {
  const dispatch = useDispatch();
  const {
    sortByValues,
    isFetchingSortByValues,
    selectedSortByValue,
  } = useSelector((state) => state.filters);
  const preparedSortByValues = prepareSortValues(sortByValues);

  useEffect(() => {
    dispatch(fetchSortByValues());
  }, [dispatch]);

  const handleSortByValueChange = useCallback((sortByValue) => {
    dispatch(selectSortByValue(sortByValue));
  }, [dispatch]);

  return (
    <div className="events-sort">
      <div className="events-sort__title">
        <Typography
          className="events-sort__title__name"
          variant="body1"
          color="textSecondary"
        >
          Сортировка
        </Typography>
        <Divider className="events-sort__title__divider" />
      </div>
      { isFetchingSortByValues
        ? (
          <div className="events-sort__loader">
            <Loader />
          </div>
        )
        : (
          <>
            { preparedSortByValues.length > 0
              && (
                <div className="events-sort__main">
                  <Dropdown
                    className="events-sort__dropdown"
                    label="Значения"
                    value={selectedSortByValue}
                    items={preparedSortByValues}
                    onChange={handleSortByValueChange}
                  />
                </div>
              )}
          </>
        )}
    </div>
  );
};

export default EventsSort;
