export const errorsToMessage = (errors) => {
  const message = errors
    ? errors.map((err) => err.message).join(', ')
    : '';

  return message;
};
