import jalaali from 'jalaali-js';

import {
  GREGORIAN_MONTHS,
  PERSIAN_MONTHS,
  GREGORIAN_WEEK_DAYS,
  PERSIAN_WEEK_DAYS,
  PERSIAN_NUMBERS,
} from './constants';
import { toExtendedDay } from './generalUtils';
import { Day, Locale, CalendarDigit } from './types';

const localeLanguages: Record<string, Locale> = {
  en: {
    months: GREGORIAN_MONTHS,
    weekDays: GREGORIAN_WEEK_DAYS,
    weekStartingIndex: 0,
    getToday(gregorianTodayObject: Day): Day {
      return gregorianTodayObject;
    },
    toNativeDate(date: Day): Date {
      return new Date(date.year, date.month - 1, date.day);
    },
    getMonthLength(date: Day): number {
      return new Date(date.year, date.month, 0).getDate();
    },
    transformDigit(digit: CalendarDigit): CalendarDigit {
      return digit;
    },
    nextMonth: 'Next Month',
    previousMonth: 'Previous Month',
    openMonthSelector: 'Open Month Selector',
    openYearSelector: 'Open Year Selector',
    closeMonthSelector: 'Close Month Selector',
    closeYearSelector: 'Close Year Selector',
    from: 'from',
    to: 'to',
    defaultPlaceholder: 'Select date',
    digitSeparator: ',',
    yearLetterSkip: 0,
    isRtl: false,
  },
  fa: {
    months: PERSIAN_MONTHS,
    weekDays: PERSIAN_WEEK_DAYS,
    weekStartingIndex: 1,
    getToday({ year, month, day }: Day): Day {
      const { jy, jm, jd } = jalaali.toJalaali(year, month, day);
      return { year: jy, month: jm, day: jd };
    },
    toNativeDate(date: Day): Date {
      const gregorian = jalaali.toGregorian(...toExtendedDay(date));
      return new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd);
    },
    getMonthLength(date: Day): number {
      return jalaali.jalaaliMonthLength(date.year, date.month);
    },
    transformDigit(digit: CalendarDigit): CalendarDigit {
      return digit
        .toString()
        .split('')
        .map(letter => PERSIAN_NUMBERS[Number(letter)] || letter)
        .join('');
    },
    nextMonth: 'ماه بعد',
    previousMonth: 'ماه قبل',
    openMonthSelector: 'نمایش انتخابگر ماه',
    openYearSelector: 'نمایش انتخابگر سال',
    closeMonthSelector: 'بستن انتخابگر ماه',
    closeYearSelector: 'بستن انتخابگر سال',
    from: 'از',
    to: 'تا',
    defaultPlaceholder: 'انتخاب...',
    digitSeparator: '،',
    yearLetterSkip: -2,
    isRtl: true,
  },
};

const getLocaleDetails = (locale: string | Locale = 'en'): Locale => {
  if (typeof locale === 'string') return localeLanguages[locale] || localeLanguages.en;
  return locale;
};

export { localeLanguages };
export default getLocaleDetails;
