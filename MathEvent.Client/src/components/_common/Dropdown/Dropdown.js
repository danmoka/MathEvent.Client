import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const Dropdown = ({
  className, items, value, label, variant, onChange,
}) => {
  const [dropdownValue, setDropdownValue] = useState(value);

  useEffect(() => {
    setDropdownValue(value);
  }, [value]);

  const handleChange = (event) => {
    const newValue = event.target.value;

    setDropdownValue(newValue);
    onChange(newValue);
  };

  return (
    <FormControl className={className} variant={variant}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={dropdownValue}
        variant={variant}
        size="small"
        onChange={handleChange}
      >
        {items.map((item) => (
          <MenuItem key={`dropdown-item-${item.value}`} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

Dropdown.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    name: PropTypes.string,
  })),
  value: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  onChange: PropTypes.func,
};

Dropdown.defaultProps = {
  className: '',
  items: [],
  value: '',
  label: 'Выберите',
  variant: 'standard',
  onChange: () => {},
};

export default Dropdown;
