const nameMaxLength = 150;
const itnMaxLength = 12;
const itnMinLength = 10;
const descriptionMaxLength = 350;

export const validateOrganizationName = (value) => {
  if (!value) {
    return 'Введите название';
  }
  if (value.length > nameMaxLength) {
    return `Длина названия не должна превышать ${nameMaxLength} символов`;
  }

  return '';
};

export const validateOrganizationITN = (value) => {
  if (!value) {
    return 'Введите ИНН';
  }
  if (value.length > itnMaxLength || value.length < itnMinLength) {
    return `Длина ИНН должна быть в 
      диапазоне ${itnMinLength} - ${itnMaxLength} символов`;
  }

  return '';
};

export const validateOrganizationDescription = (value) => {
  if (!value) {
    return 'Введите описание';
  }
  if (value.length > descriptionMaxLength) {
    return `Длина описания не должна 
      превышать ${descriptionMaxLength} символов`;
  }

  return '';
};
