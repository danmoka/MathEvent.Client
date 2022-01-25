const passwordMinLength = 6;
const passwordMaxLength = 255;
const usernameMaxLength = 256;
const nameMaxLength = 50;
const surnameMaxLength = 50;
// eslint-disable-next-line max-len
const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateUserUsername = (value) => {
  if (!value) {
    return 'Введите логин';
  }
  if (value.length > usernameMaxLength) {
    return `Длина логина не должна превышать ${usernameMaxLength} символов`;
  }

  return '';
};

export const validateUserPassword = (value) => {
  if (!value) {
    return 'Введите пароль';
  }
  if (value.length < passwordMinLength) {
    return `Минимальная длина ${passwordMinLength} символов`;
  }
  if (value.length > passwordMaxLength) {
    return `Максимальная длина ${passwordMaxLength} символов`;
  }

  return '';
};

export const validateUserEmail = (value) => {
  if (!value) {
    return 'Введите email';
  }
  if (!value.match(emailPattern)) {
    return 'Некорректный email';
  }

  return '';
};

export const validateUserPasswordConfirm = (password, confirm) => {
  if (!password) {
    return 'Введите пароль';
  }

  const passwordValidation = validateUserPassword(confirm);

  if (passwordValidation) {
    return passwordValidation;
  }

  if (password !== confirm) {
    return 'Пароли не совпадают';
  }

  return '';
};

export const validateUserName = (value) => {
  if (!value) {
    return 'Введите имя';
  }
  if (value.length > nameMaxLength) {
    return `Максимальная длина ${nameMaxLength} символов`;
  }

  return '';
};

export const validateUserSurname = (value) => {
  if (!value) {
    return 'Введите фамилию';
  }
  if (value.length > nameMaxLength) {
    return `Максимальная длина ${surnameMaxLength} символов`;
  }

  return '';
};
