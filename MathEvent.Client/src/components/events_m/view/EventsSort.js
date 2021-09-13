import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Dropdown from '../../_common/Dropdown';
import './EventsView.scss';

const prepareDateTimes = () => [
  { value: 'newest', name: 'От новых к старым' },
  { value: 'oldest', name: 'От старых к новым' },
];

const prepareAlphabeticalOrder = () => [
  { value: 'alphabetical', name: 'От А до Я' },
  { value: 'alphabeticalReverse', name: 'От Я до А' },
];

const EventsSort = () => {
  const preparedDateTimes = prepareDateTimes();
  const preparedAlphabeticalOrder = prepareAlphabeticalOrder();

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
      <div className="events-sort__main">
        <Dropdown
          className="events-sort__dropdown"
          label="По дате"
          value={preparedDateTimes[0].value}
          items={preparedDateTimes}
          onChange={() => {}}
        />
        <Dropdown
          className="events-sort__dropdown"
          label="По названию"
          value={preparedAlphabeticalOrder[0].value}
          items={preparedAlphabeticalOrder}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

export default EventsSort;
