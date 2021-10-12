import React from 'react';
import PropTypes from 'prop-types';
import { IconButton as MaterialIconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import colors from '../../../constants/colors';
import icons from './icons';
import './Icon.scss';

const Icon = ({ type }) => {
  const SpecificIcon = icons[type];

  return <SpecificIcon />;
};

Icon.propTypes = {
  type: PropTypes.string,
};

Icon.defaultProps = {
  type: undefined,
};

const IconButton = ({
  className, color, type, size, selected, title, onClick,
}) => {
  const SpecificIcon = icons[type];
  const buttonColor = selected ? colors.primary : color;

  return (
    title
      ? (
        <Tooltip title={title}>
          <MaterialIconButton
            className={className}
            onClick={onClick}
            size={size}
            color={buttonColor}
          >
            <SpecificIcon color={buttonColor} />
          </MaterialIconButton>
        </Tooltip>
      )
      : (
        <MaterialIconButton
          className={className}
          onClick={onClick}
          size={size}
          color={buttonColor}
        >
          <SpecificIcon color={buttonColor} />
        </MaterialIconButton>
      )
  );
};

IconButton.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  selected: PropTypes.bool,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

IconButton.defaultProps = {
  className: 'icon',
  color: 'inherit',
  type: undefined,
  size: 'medium',
  selected: false,
  title: undefined,
  onClick: () => {},
};

export { Icon, IconButton };
