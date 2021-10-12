import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const Dropdown = ({
  className, items, value, label, variant, displayEmpty, onChange,
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
    <FormControl variant={variant} className={className}>
      {displayEmpty
        ? (
          <InputLabel shrink id="dropdown-label">{label}</InputLabel>
        )
        : (
          <InputLabel id="dropdown-label">{label}</InputLabel>
        )}
      <Select
        labelId="dropdown-label"
        id={`dropdown-label-${variant}`}
        value={dropdownValue}
        onChange={handleChange}
        label={label}
        displayEmpty={displayEmpty}
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
  displayEmpty: PropTypes.bool,
  onChange: PropTypes.func,
};

Dropdown.defaultProps = {
  className: '',
  items: [],
  value: '',
  label: 'Выберите',
  variant: 'standard',
  displayEmpty: false,
  onChange: () => {},
};

export default Dropdown;
