import React, { useRef, useEffect } from 'react';

import { getSlideDate, handleSlideAnimationEnd, animateContent } from '../shared/sliderHelpers';
import {
  deepCloneObject,
  isSameDay,
  createUniqueRange,
  getValueType,
} from '../shared/generalUtils';
import { TYPE_SINGLE_DATE, TYPE_RANGE, TYPE_MUTLI_DATE } from '../shared/constants';
import handleKeyboardNavigation from '../shared/keyboardNavigation';
import { useLocaleUtils, useLocaleLanguage } from '../shared/hooks';
import { Day, CustomDayClassNameItem, Locale } from '../shared/types';

interface DaysListProps {
  activeDate: Day;
  value?: any;
  monthChangeDirection: string;
  onSlideChange: () => void;
  disabledDays?: Day[];
  onDisabledDayError?: (day: Day) => void;
  minimumDate?: Day | null;
  maximumDate?: Day | null;
  onChange?: (value: any) => void;
  locale?: string | Locale;
  calendarTodayClassName?: string;
  calendarSelectedDayClassName?: string;
  calendarRangeStartClassName?: string;
  calendarRangeEndClassName?: string;
  calendarRangeBetweenClassName?: string;
  shouldHighlightWeekends?: boolean;
  isQuickSelectorOpen?: boolean;
  customDaysClassName?: CustomDayClassNameItem[];
}

const DaysList: React.FC<DaysListProps> = ({
  activeDate,
  value,
  monthChangeDirection,
  onSlideChange,
  disabledDays = [],
  onDisabledDayError = () => {},
  minimumDate,
  maximumDate,
  onChange = () => {},
  locale,
  calendarTodayClassName = '',
  calendarSelectedDayClassName = '',
  calendarRangeStartClassName = '',
  calendarRangeEndClassName = '',
  calendarRangeBetweenClassName = '',
  shouldHighlightWeekends = false,
  isQuickSelectorOpen = false,
  customDaysClassName = [],
}) => {
  const calendarSectionWrapper = useRef<HTMLDivElement>(null);
  const { isRtl, weekDays: weekDaysList } = useLocaleLanguage(locale);
  const {
    getToday,
    isBeforeDate,
    checkDayInDayRange,
    getMonthFirstWeekday,
    getMonthLength,
    getLanguageDigits,
    getMonthName,
  } = useLocaleUtils(locale);
  const today = getToday();

  useEffect(() => {
    if (!monthChangeDirection || !calendarSectionWrapper.current) return;
    animateContent({
      direction: monthChangeDirection,
      parent: calendarSectionWrapper.current,
    });
  }, [monthChangeDirection]);

  const getDayRangeValue = (day: Day) => {
    const clonedDayRange = deepCloneObject(value) || { from: null, to: null };
    const dayRangeValue =
      clonedDayRange.from && clonedDayRange.to ? { from: null, to: null } : clonedDayRange;
    const dayRangeProp = !dayRangeValue.from ? 'from' : 'to';
    dayRangeValue[dayRangeProp] = day;
    const { from, to } = dayRangeValue;

    // swap from and to values if from is later than to
    if (from && to && isBeforeDate(dayRangeValue.to, dayRangeValue.from)) {
      dayRangeValue.from = to;
      dayRangeValue.to = from;
    }

    const checkIncludingDisabledDay = (disabledDay: Day) => {
      return checkDayInDayRange({
        day: disabledDay,
        from: dayRangeValue.from,
        to: dayRangeValue.to,
      });
    };
    const includingDisabledDay = disabledDays.find(checkIncludingDisabledDay);
    if (includingDisabledDay) {
      onDisabledDayError(includingDisabledDay);
      return value;
    }

    return dayRangeValue;
  };

  const getMultiDateValue = (day: Day) => {
    const isAlreadyExisting = (value || []).some((valueDay: Day) => isSameDay(valueDay, day));
    const addedToValue = [...(value || []), day];
    const removedFromValue = (value || []).filter((valueDay: Day) => !isSameDay(valueDay, day));
    return isAlreadyExisting ? removedFromValue : addedToValue;
  };

  const handleDayClick = (day: Day) => {
    const getNewValue = () => {
      const valueType = getValueType(value);
      switch (valueType) {
        case TYPE_SINGLE_DATE:
          return day;
        case TYPE_RANGE:
          return getDayRangeValue(day);
        case TYPE_MUTLI_DATE:
          return getMultiDateValue(day);
        default:
          return day;
      }
    };
    const newValue = getNewValue();
    onChange(newValue);
  };

  const isSingleDateSelected = (day: Day) => {
    const valueType = getValueType(value);
    if (valueType === TYPE_SINGLE_DATE) return isSameDay(day, value);
    if (valueType === TYPE_MUTLI_DATE) return (value || []).some((valueDay: Day) => isSameDay(valueDay, day));
    return false;
  };

  const getDayStatus = (dayItem: Day) => {
    const isToday = isSameDay(dayItem, today);
    const isSelected = isSingleDateSelected(dayItem);
    const { from: startingDay, to: endingDay } = value || {};
    const isStartingDayRange = isSameDay(dayItem, startingDay);
    const isEndingDayRange = isSameDay(dayItem, endingDay);
    const isWithinRange = checkDayInDayRange({ day: dayItem, from: startingDay, to: endingDay });
    return { isToday, isSelected, isStartingDayRange, isEndingDayRange, isWithinRange };
  };

  const getDayClassNames = (dayItem: any) => {
    const {
      isToday,
      isSelected,
      isStartingDayRange,
      isEndingDayRange,
      isWithinRange,
    } = getDayStatus(dayItem);
    const customDayItemClassName = customDaysClassName.find(day => isSameDay(dayItem, day));
    const classNames = ''
      .concat(isToday && !isSelected ? ` -today ${calendarTodayClassName}` : '')
      .concat(!dayItem.isStandard ? ' -blank' : '')
      .concat(dayItem.isWeekend && shouldHighlightWeekends ? ' -weekend' : '')
      .concat(customDayItemClassName ? ` ${customDayItemClassName.className}` : '')
      .concat(isSelected ? ` -selected ${calendarSelectedDayClassName}` : '')
      .concat(isStartingDayRange ? ` -selectedStart ${calendarRangeStartClassName}` : '')
      .concat(isEndingDayRange ? ` -selectedEnd ${calendarRangeEndClassName}` : '')
      .concat(isWithinRange ? ` -selectedBetween ${calendarRangeBetweenClassName}` : '')
      .concat(dayItem.isDisabled ? ' -disabled' : '');
    return classNames;
  };

  const getViewMonthDays = (date: Day) => {
    // to match month starting date with the correct weekday label
    const prependingBlankDays = createUniqueRange(getMonthFirstWeekday(date), 'starting-blank').map(item => ({
      ...item,
      isStandard: false,
      month: date.month,
      year: date.year,
    }));
    const standardDays = createUniqueRange(getMonthLength(date)).map(day => ({
      ...day,
      isStandard: true,
      month: date.month,
      year: date.year,
    }));
    const allDays = [...prependingBlankDays, ...standardDays];
    return allDays;
  };

  const handleDayPress = ({ isDisabled, ...dayItem }: any) => {
    if (isDisabled) {
      onDisabledDayError(dayItem); // good for showing error messages
    } else handleDayClick(dayItem);
  };

  const isDayReachableByKeyboard = ({
    isOnActiveSlide,
    isStandard,
    isSelected,
    isStartingDayRange,
    isToday,
    day,
  }: any) => {
    if (isQuickSelectorOpen || !isOnActiveSlide || !isStandard) return false;
    if (isSelected || isStartingDayRange || isToday || day === 1) return true;
    return false;
  };

  const renderEachWeekDays = ({ id, value: day, month, year, isStandard }: any, index: number) => {
    const dayItem = { day, month, year };
    const isInDisabledDaysRange = disabledDays.some(disabledDay => isSameDay(dayItem, disabledDay));
    const isBeforeMinimumDate = isBeforeDate(dayItem, minimumDate);
    const isAfterMaximumDate = isBeforeDate(maximumDate, dayItem);
    const isNotInValidRange = isStandard && (isBeforeMinimumDate || isAfterMaximumDate);
    const isDisabled = isInDisabledDaysRange || isNotInValidRange;
    const isWeekend = weekDaysList.some(
      (weekDayItem, weekDayItemIndex) => weekDayItem.isWeekend && weekDayItemIndex === index,
    );
    const additionalClass = getDayClassNames({ ...dayItem, isWeekend, isStandard, isDisabled });
    const dayLabel = `${weekDaysList[index].name}, ${day} ${getMonthName(month)} ${year}`;
    const isOnActiveSlide = month === activeDate.month;
    const dayStatus = getDayStatus(dayItem);
    const { isSelected, isStartingDayRange, isEndingDayRange, isWithinRange } = dayStatus;
    const shouldEnableKeyboardNavigation = isDayReachableByKeyboard({
      ...dayItem,
      ...dayStatus,
      isOnActiveSlide,
      isStandard,
    });
    return (
      <div
        tabIndex={shouldEnableKeyboardNavigation ? 0 : -1}
        key={id}
        className={`Calendar__day -${isRtl ? 'rtl' : 'ltr'} ${additionalClass}`}
        onClick={() => {
          handleDayPress({ ...dayItem, isDisabled });
        }}
        onKeyDown={({ key }) => {
          /* istanbul ignore else */
          if (key === 'Enter') handleDayPress({ ...dayItem, isDisabled });
        }}
        aria-disabled={isDisabled}
        aria-label={dayLabel}
        aria-selected={isSelected || isStartingDayRange || isEndingDayRange || isWithinRange}
        {...(!isStandard || !isOnActiveSlide || isQuickSelectorOpen ? { 'aria-hidden': true } : {})}
        role="gridcell"
        data-is-default-selectable={shouldEnableKeyboardNavigation}
      >
        {!isStandard ? '' : getLanguageDigits(day)}
      </div>
    );
  };

  const renderMonthDays = (isInitialActiveChild: boolean) => {
    const date = getSlideDate({
      activeDate,
      isInitialActiveChild,
      monthChangeDirection,
      parent: calendarSectionWrapper.current,
    });
    const allDays = getViewMonthDays(date);
    const renderSingleWeekRow = (weekRowIndex: number) => {
      const eachWeekDays = allDays
        .slice(weekRowIndex * 7, weekRowIndex * 7 + 7)
        .map(renderEachWeekDays);
      return (
        <div key={String(weekRowIndex)} className="Calendar__weekRow" role="row">
          {eachWeekDays}
        </div>
      );
    };
    return Array.from(Array(6).keys()).map(renderSingleWeekRow);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    handleKeyboardNavigation(e, { allowVerticalArrows: true });
  };

  return (
    <div
      ref={calendarSectionWrapper}
      className="Calendar__sectionWrapper"
      role="presentation"
      data-testid="days-section-wrapper"
      onKeyDown={handleKeyDown}
    >
      <div
        onAnimationEnd={e => {
          handleSlideAnimationEnd(e);
          onSlideChange();
        }}
        className="Calendar__section -shown"
        role="rowgroup"
      >
        {renderMonthDays(true)}
      </div>
      <div
        onAnimationEnd={e => {
          handleSlideAnimationEnd(e);
          onSlideChange();
        }}
        className="Calendar__section -hiddenNext"
        role="rowgroup"
      >
        {renderMonthDays(false)}
      </div>
    </div>
  );
};

export default DaysList;
