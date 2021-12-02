import React from 'react';
import PropTypes from 'prop-types';
import { NormalText } from '../Text/Text';
import './Chart.scss';

const Title = ({ text, className }) => (
  <NormalText className={className}>
    {text}
  </NormalText>
);

Title.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
};

Title.defaultProps = {
  className: 'chart__title',
  text: 'Заголовок не задан',
};

export default Title;
