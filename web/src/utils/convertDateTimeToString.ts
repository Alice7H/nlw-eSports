export function convertDateTimeToString(value : Date): string {
  return [value.getHours(), value.getMinutes()].join(':');
}
