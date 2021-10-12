import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import { iconTypes, IconButton } from '../Icon';
import './Date.scss';

const DateField = ({
  className,
  label,
  inputVariant,
  okLabel,
  cancelLabel,
  showCloseButton,
  value,
  minDate,
  minDateMessage,
  onChange,
}) => {
  const [fieldValue, setFieldValue] = useState(value);

  useEffect(() => {
    setFieldValue(value);
  }, [value]);

  const handleChange = (newValue) => {
    setFieldValue(newValue);
    onChange(newValue);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    handleChange(null);
  };

  return (
    <MuiPickersUtilsProvider
      locale={ruLocale}
      utils={DateFnsUtils}
    >
      <DateTimePicker
        className={className}
        autoOk
        ampm={false}
        inputVariant={inputVariant}
        okLabel={okLabel}
        cancelLabel={cancelLabel}
        value={fieldValue}
        onChange={handleChange}
        label={label}
        minDateMessage={minDateMessage}
        minDate={minDate}
        InputProps={{
          endAdornment: (
            showCloseButton && (
              <IconButton
                type={iconTypes.close}
                size="small"
                onClick={handleClear}
              />
            )
          ),
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

DateField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  inputVariant: PropTypes.string,
  okLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  showCloseButton: PropTypes.bool,
  value: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  minDateMessage: PropTypes.string,
  onChange: PropTypes.func,
};

DateField.defaultProps = {
  className: 'datefield',
  label: 'Дата и время',
  inputVariant: 'standard',
  okLabel: 'Готово',
  cancelLabel: 'Отмена',
  showCloseButton: false,
  value: new Date(),
  minDate: null,
  minDateMessage: 'Выход за пределы минимальной даты',
  onChange: () => {},
};

export default DateField;
