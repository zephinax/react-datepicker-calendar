/*
  These utility functions highly depend on locale of the date picker (Persian or Gregorian)
*/

import getLocaleDetails from './localeLanguages';
import { Day, DayValue, Locale, Utils } from './types';

const utils = (locale: string | Locale = 'en'): Utils => {
  const localeDetails: Locale = typeof locale === 'string' ? getLocaleDetails(locale) : locale;
  const {
    months: monthsList,
    weekDays: weekDaysList,
    getToday: localeGetToday,
    toNativeDate,
    getMonthLength: localeGetMonthLength,
    weekStartingIndex,
    transformDigit: getLanguageDigits,
  } = localeDetails;

  const getToday = (): Day => {
    const todayDate = new Date();
    const year = todayDate.getFullYear();
    const month = todayDate.getMonth() + 1;
    const day = todayDate.getDate();
    return localeGetToday({ year, month, day });
  };

  const getMonthName = (month: number): string => monthsList[month - 1];

  const getMonthNumber = (monthName: string): number => monthsList.indexOf(monthName) + 1;

  const getMonthLength = (day: Day): number => localeGetMonthLength(day);

  const getMonthFirstWeekday = (date: Day): number => {
    const gregorianDate = toNativeDate({ ...date, day: 1 });
    const weekday = gregorianDate.getDay();
    const dayIndex = weekday + weekStartingIndex;
    return dayIndex % 7;
  };

  const isBeforeDate = (day1?: Day | null, day2?: Day | null): boolean => {
    if (!day1 || !day2) return false;
    return toNativeDate(day1) < toNativeDate(day2);
  };

  const checkDayInDayRange = ({
    day,
    from,
    to,
  }: {
    day: Day;
    from: DayValue;
    to: DayValue;
  }): boolean => {
    if (!day || !from || !to) return false;
    const nativeDay = toNativeDate(day);
    const nativeFrom = toNativeDate(from);
    const nativeTo = toNativeDate(to);
    return nativeDay > nativeFrom && nativeDay < nativeTo;
  };

  return {
    monthsList,
    weekDaysList,
    getToday,
    getMonthName,
    getMonthNumber,
    getMonthLength,
    getMonthFirstWeekday,
    isBeforeDate,
    checkDayInDayRange,
    getLanguageDigits: (digit: string | number) => String(getLanguageDigits(digit)),
  };
};

export default utils;
