/**
 * @date: string YYYY-MM-DD
 * @type: date   start end
 * @return: 时间戳
 */
 export function stringTimeFormatStamp(date, type) {
  if (!date) {
    return false;
  }
  switch (type) {
    case 'start':
      return moment(`${date} 00:00:00`).valueOf();
    case 'end':
      return moment(`${date} 23:59:59`).valueOf();
    default:
      return moment(date).valueOf();
  }
}