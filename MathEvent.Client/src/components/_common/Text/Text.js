import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const HugeText = ({ children, color }) => (
  <Typography variant="h6" color={color}>
    {children}
  </Typography>
);

HugeText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  color: PropTypes.string,
};

HugeText.defaultProps = {
  children: null,
  color: 'textPrimary',
};

const NormalText = ({ children, color }) => (
  <Typography variant="body1" color={color}>
    {children}
  </Typography>
);

NormalText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  color: PropTypes.string,
};

NormalText.defaultProps = {
  children: null,
  color: 'textPrimary',
};

const SmallText = ({ children, color }) => (
  <Typography variant="body2" color={color}>
    {children}
  </Typography>
);

SmallText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  color: PropTypes.string,
};

SmallText.defaultProps = {
  children: null,
  color: 'textPrimary',
};

export { HugeText, NormalText, SmallText };
