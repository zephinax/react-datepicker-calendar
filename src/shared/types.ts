import React from 'react';

export type Day = {
  year: number;
  month: number;
  day: number;
};

export type DayValue = Day | null | undefined;

export type DayRange = { from: DayValue; to: DayValue };

export type Value = DayValue | Day[] | DayRange;

export type CustomDayClassNameItem = Day & { className: string };

export type WeekDay = {
  name: string;
  short: string;
  isWeekend?: boolean;
};

export type CalendarDigit = string | number;

export interface Locale {
  months: string[];
  weekDays: WeekDay[];
  weekStartingIndex: number;
  getToday: (gregorianTodayObject: Day) => Day;
  toNativeDate: (date: Day) => Date;
  getMonthLength: (date: Day) => number;
  transformDigit: (digit: CalendarDigit) => CalendarDigit;
  nextMonth: string;
  previousMonth: string;
  openMonthSelector: string;
  openYearSelector: string;
  closeMonthSelector: string;
  closeYearSelector: string;
  from: string;
  to: string;
  defaultPlaceholder: string;
  digitSeparator: string;
  yearLetterSkip: number;
  isRtl: boolean;
}

export type Utils = {
  monthsList: string[];
  weekDaysList: WeekDay[];
  getToday(): Day;
  getMonthName(number: number): string;
  getMonthNumber(name: string): number;
  getMonthLength(day: Day): number;
  getMonthFirstWeekday(day: Day): number;
  isBeforeDate(a?: Day | null, b?: Day | null): boolean;
  checkDayInDayRange(props: { day: Day; from: DayValue; to: DayValue }): boolean;
  getLanguageDigits(digit: string | number): string;
};

export interface CalendarProps<TValue extends Value = DayValue> {
  value?: TValue;
  onChange?: (value: any) => void;
  onDisabledDayError?: (value: Day) => void;
  selectorStartingYear?: number;
  selectorEndingYear?: number;
  locale?: string | Locale;
  minimumDate?: Day | null;
  maximumDate?: Day | null;
  disabledDays?: Day[];
  shouldHighlightWeekends?: boolean;
  colorPrimary?: string;
  colorPrimaryLight?: string;
  slideAnimationDuration?: string;
  calendarClassName?: string;
  calendarTodayClassName?: string;
  calendarSelectedDayClassName?: string;
  calendarRangeStartClassName?: string;
  calendarRangeBetweenClassName?: string;
  calendarRangeEndClassName?: string;
  renderFooter?: () => React.ReactNode;
  customDaysClassName?: CustomDayClassNameItem[];
}

export type RenderInputProps = {
  ref: React.Ref<HTMLInputElement>;
};

export interface DatePickerProps<TValue extends Value = DayValue> extends CalendarProps<TValue> {
  wrapperClassName?: string;
  inputClassName?: string;
  inputName?: string;
  calendarPopperPosition?: 'auto' | 'top' | 'bottom';
  inputPlaceholder?: string;
  formatInputText?: () => string;
  renderInput?: (props: RenderInputProps) => React.ReactNode;
}
