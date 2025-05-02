/**
 * Format a date to a string in the format dd.mm.yyyy hh:mm:ss
 *
 * @param date - The date to format. If not provided, the current date is used.
 */
export const formatDate = (date?: Date): string => {
  const d = new Date(date || Date.now());
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};
