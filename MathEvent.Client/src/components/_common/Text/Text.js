import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const HugeText = ({ className, children, color }) => (
  <Typography className={className} variant="h6" color={color}>
    {children}
  </Typography>
);

HugeText.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  color: PropTypes.string,
};

HugeText.defaultProps = {
  className: null,
  children: null,
  color: 'textPrimary',
};

const NormalText = ({ className, children, color }) => (
  <Typography className={className} variant="body1" color={color}>
    {children}
  </Typography>
);

NormalText.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  color: PropTypes.string,
};

NormalText.defaultProps = {
  className: null,
  children: null,
  color: 'textPrimary',
};

const SmallText = ({ className, children, color }) => (
  <Typography className={className} variant="body2" color={color}>
    {children}
  </Typography>
);

SmallText.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  color: PropTypes.string,
};

SmallText.defaultProps = {
  className: null,
  children: null,
  color: 'textPrimary',
};

export { HugeText, NormalText, SmallText };
