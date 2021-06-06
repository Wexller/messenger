import dateAndTime from 'date-and-time';

const patterns = {
  today: dateAndTime.compile('HH:mm'),
  yesterday: dateAndTime.compile('DD MMM'),
};

/**
 * Returns prepared date string
 * @param {String} datetime
 * @param {String} todayMessage
 */
export const getDateTime = (datetime, todayMessage = null) => {
  const date = new Date(datetime);

  return isToday(date)
    ? todayMessage ?? dateAndTime.format(date, patterns.today)
    : dateAndTime.format(date, patterns.yesterday);
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

/**
 * Check if 2 dates in the same day
 * @param {String} dateString1
 * @param {String} dateString2
 * @returns {boolean}
 */
export const areDatesInOneDay = (dateString1, dateString2) => {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};
