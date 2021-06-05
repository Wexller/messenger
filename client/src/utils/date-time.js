import dateAndTime from 'date-and-time';

const patterns = {
  today: dateAndTime.compile('HH:mm'),
  yesterday: dateAndTime.compile('DD MMM'),
};

/**
 * Returns prepared date string
 * @param {String} datetime
 */
export const getTime = (datetime) => {
  const date = new Date(datetime);
  return isToday(date) ? dateAndTime.format(date, patterns.today) : dateAndTime.format(date, patterns.yesterday);
};

/**
 * Check if a date is today
 * @param {Date} comparingDate
 * @return {boolean}
 */
const isToday = (comparingDate) => {
  const today = new Date();
  return (
    comparingDate.getDate() === today.getDate() &&
    comparingDate.getMonth() === today.getMonth() &&
    comparingDate.getFullYear() === today.getFullYear()
  );
};
