import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MuiTextField from '@material-ui/core/TextField';
import colors from '../../../constants/colors';

const TextField = ({
  className,
  label,
  type,
  value,
  error,
  disabled,
  helperText,
  multiline,
  rows,
  onChange,
  onFocus,
  onFocusOut,
}) => {
  const [fieldValue, setFieldValue] = useState(value);

  useEffect(() => {
    setFieldValue(value);
  }, [value]);

  const handleChange = (event) => {
    const newValue = event.target.value;

    setFieldValue(newValue);
    onChange(newValue);
  };

  return (
    <MuiTextField
      className={className}
      color={colors.primary}
      error={error}
      helperText={helperText}
      label={label}
      size="small"
      type={type}
      disabled={disabled}
      value={fieldValue}
      variant="outlined"
      multiline={multiline}
      rows={multiline ? rows : null}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onFocusOut}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

TextField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onFocusOut: PropTypes.func,
};

TextField.defaultProps = {
  className: '',
  label: 'Text field',
  type: undefined,
  value: 'Text field value',
  error: false,
  disabled: false,
  helperText: '',
  multiline: false,
  rows: 1,
  onChange: () => {},
  onFocus: () => {},
  onFocusOut: () => {},
};

export default TextField;
