export const getLocaleDateTimeFromUTC = (dateTimeUTC) => {
  const dateAndTime = dateTimeUTC.indexOf('T') > -1
    ? dateTimeUTC.split('T')
    : dateTimeUTC.split(' ');
  const dateTime = new Date();

  if (dateAndTime[0]) {
    const dates = dateAndTime[0].split('-');

    if (dates[0]) {
      dateTime.setUTCFullYear(parseInt(dates[0], 10));
    }

    if (dates[1]) {
      dateTime.setUTCMonth(parseInt(dates[1] - 1, 10));
    }

    if (dates[2]) {
      dateTime.setUTCDate(parseInt(dates[2], 10));
    }
  }

  if (dateAndTime[1]) {
    const times = dateAndTime[1].split(':');

    if (times[0] && times[1]) {
      dateTime.setUTCHours(parseInt(times[0], 10));
      dateTime.setUTCMinutes(parseInt(times[1], 10));
      dateTime.setUTCSeconds(0);
    }
  }

  return dateTime.toISOString();
};
