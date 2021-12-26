import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MuiCheckbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import colors from '../../../constants/colors';

const Checkbox = ({
  className, value, label, disabled, onChange,
}) => {
  const [checkboxValue, setCheckboxValue] = useState(value);

  useEffect(() => {
    setCheckboxValue(value);
  }, [value]);

  const handleChange = () => {
    const newValue = !checkboxValue;

    setCheckboxValue(newValue);
    onChange(newValue);
  };

  return (
    <FormControlLabel
      className={className}
      label={label}
      control={(
        <MuiCheckbox
          color={colors.primary}
          checked={checkboxValue}
          disabled={disabled}
          onChange={handleChange}
          onMouseDown={(e) => e.stopPropagation()}
        />
              )}
    />
  );
};

Checkbox.propTypes = {
  className: PropTypes.string,
  value: PropTypes.bool,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  className: 'card',
  value: false,
  label: '',
  disabled: false,
  onChange: () => {},
};

export default Checkbox;
