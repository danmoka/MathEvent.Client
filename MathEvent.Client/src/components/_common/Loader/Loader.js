import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import colors from '../../../constants/colors';
import './Loader.scss';

const Loader = ({ className, color, size }) => (
  <CircularProgress className={`${className} loader--${size}`} color={color} />
);

Loader.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
};

Loader.defaultProps = {
  className: 'loader',
  color: colors.primary,
  size: 'medium',
};

export default Loader;
