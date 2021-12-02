import React from 'react';
import PropTypes from 'prop-types';
import MuiButton from '@material-ui/core/Button';
import { Icon } from '../Icon';
import buttonTypes from '../../../constants/button-types';
import colors from '../../../constants/colors';
import './Button.scss';

const Button = ({
  className, type, color, disabled, startIcon, endIcon, onClick, children,
}) => (
  <MuiButton
    className={className}
    variant={type}
    color={color}
    disabled={disabled}
    onClick={onClick}
    startIcon={startIcon ? <Icon type={startIcon} /> : null}
    endIcon={endIcon ? <Icon type={endIcon} /> : null}
  >
    {children}
  </MuiButton>
);

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  startIcon: PropTypes.string,
  endIcon: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

Button.defaultProps = {
  className: 'button',
  type: buttonTypes.contained,
  color: colors.primary,
  disabled: false,
  startIcon: undefined,
  endIcon: undefined,
  onClick: () => {},
  children: '',
};

export default Button;
