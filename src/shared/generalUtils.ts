import { TYPE_SINGLE_DATE, TYPE_RANGE, TYPE_MUTLI_DATE } from './constants';
import { Day } from './types';

/*
  These utility functions don't depend on locale of the date picker (Persian or Gregorian)
*/

const createUniqueRange = (number: number, startingId: string = 'range'): Array<{ value: number; id: string }> =>
  Array.from(Array(number).keys()).map(key => ({
    value: key + 1,
    id: `${startingId}-${key}`,
  }));

const isSameDay = (day1?: Day | null, day2?: Day | null): boolean => {
  if (!day1 || !day2) return false;
  return day1.day === day2.day && day1.month === day2.month && day1.year === day2.year;
};

const putZero = (number: number | string): string | number =>
  number.toString().length === 1 ? `0${number}` : number;

const toExtendedDay = (date: Day): [number, number, number] => [date.year, date.month, date.day];

const shallowClone = <T extends object>(value: T): T => ({ ...value });

const deepCloneObject = <T>(obj: T): T =>
  JSON.parse(JSON.stringify(obj, (_key, value) => (typeof value === 'undefined' ? null : value)));

const getDateAccordingToMonth = (date: Day, direction: string): Day => {
  const toSum = direction === 'NEXT' ? 1 : -1;
  let newMonthIndex = date.month + toSum;
  let newYear = date.year;
  if (newMonthIndex < 1) {
    newMonthIndex = 12;
    newYear -= 1;
  }
  if (newMonthIndex > 12) {
    newMonthIndex = 1;
    newYear += 1;
  }
  const newDate: Day = { year: newYear, month: newMonthIndex, day: 1 };
  return newDate;
};

const hasProperty = (object: any, propertyName: string): boolean =>
  Object.prototype.hasOwnProperty.call(object || {}, propertyName);

const getValueType = (value: any): string => {
  if (Array.isArray(value)) return TYPE_MUTLI_DATE;
  if (hasProperty(value, 'from') && hasProperty(value, 'to')) return TYPE_RANGE;
  if (
    !value ||
    (hasProperty(value, 'year') && hasProperty(value, 'month') && hasProperty(value, 'day'))
  ) {
    return TYPE_SINGLE_DATE;
  }
  throw new TypeError(
    `The passed value is malformed! Please make sure you're using one of the valid value types for date picker.`,
  );
};

export {
  createUniqueRange,
  isSameDay,
  putZero,
  toExtendedDay,
  shallowClone,
  deepCloneObject,
  getDateAccordingToMonth,
  getValueType,
};
