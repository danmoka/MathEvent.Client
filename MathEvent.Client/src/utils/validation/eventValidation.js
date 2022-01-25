const nameMaxLength = 250;
const descriptionMaxLength = 500;
const locationMaxLength = 100;

export const validateEventName = (value) => {
  if (!value) {
    return 'Введите название';
  }
  if (value.length > nameMaxLength) {
    return `Длина названия не должна превышать ${nameMaxLength} символов`;
  }

  return '';
};

export const validateEventDescription = (value) => {
  if (!value) {
    return 'Введите описание';
  }
  if (value.length > descriptionMaxLength) {
    return `Длина описания не должна 
    превышать ${descriptionMaxLength} символов`;
  }

  return '';
};

export const validateEventLocation = (value) => {
  if (!value) {
    return 'Введите адрес';
  }
  if (value.length > locationMaxLength) {
    return `Длина адреса не должна 
      превышать ${locationMaxLength} символов`;
  }

  return '';
};

export const validateEventDate = (value) => {
  if (!value) {
    return 'Введите дату';
  }

  const date = new Date(value);

  if (date <= new Date(Date.now())) {
    return 'Дата меньше или равна текущей';
  }

  return '';
};
