export const getInitials = (
  name,
  surname,
) => `${name.slice(0, 1)}${surname.slice(0, 1)}`;
