import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { SmallText } from '../Text/Text';

const Date = ({ date, format }) => (
  <SmallText>
    <Moment
      className="date__time"
      format={format}
      date={date}
      withTitle
      locale="ru"
    />
  </SmallText>
);

Date.propTypes = {
  date: PropTypes.string,
  format: PropTypes.string,
};

Date.defaultProps = {
  date: null,
  format: 'LLLL',
};

export default Date;
