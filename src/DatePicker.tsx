import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import './DatePicker.css';
import { Calendar } from './Calendar';
import DatePickerInput from './DatePickerInput';
import { getValueType } from './shared/generalUtils';
import { TYPE_SINGLE_DATE, TYPE_MUTLI_DATE, TYPE_RANGE } from './shared/constants';
import { useIsomorphicLayoutEffect } from './shared/hooks';
import { DatePickerProps, Value } from './shared/types';

const DatePickerComponent = React.forwardRef<HTMLDivElement, DatePickerProps<Value>>(
  (
    {
      value,
      onChange = () => {},
      formatInputText,
      inputPlaceholder,
      inputClassName,
      inputName,
      renderInput,
      wrapperClassName = '',
      calendarClassName,
      calendarTodayClassName,
      calendarSelectedDayClassName,
      calendarRangeStartClassName,
      calendarRangeBetweenClassName,
      calendarRangeEndClassName,
      calendarPopperPosition = 'auto',
      disabledDays,
      onDisabledDayError,
      colorPrimary,
      colorPrimaryLight,
      slideAnimationDuration,
      minimumDate,
      maximumDate,
      selectorStartingYear,
      selectorEndingYear,
      locale = 'en',
      shouldHighlightWeekends,
      renderFooter,
      customDaysClassName,
    },
    ref,
  ) => {
    const wrapperElement = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => wrapperElement.current as HTMLDivElement);

    const calendarContainerElement = useRef<HTMLDivElement>(null);
    const inputElement = useRef<HTMLInputElement>(null);
    const shouldPreventToggle = useRef(false);
    const [isCalendarOpen, setCalendarVisibility] = useState(false);

    useEffect(() => {
      const handleBlur = () => {
        setCalendarVisibility(false);
      };
      window.addEventListener('blur', handleBlur, false);
      return () => {
        window.removeEventListener('blur', handleBlur, false);
      };
    }, []);

    // handle input focus/blur
    useEffect(() => {
      const valueType = getValueType(value);
      if (valueType === TYPE_MUTLI_DATE) return; // no need to close the calendar
      const shouldCloseCalendar =
        valueType === TYPE_SINGLE_DATE
          ? !isCalendarOpen
          : !isCalendarOpen && (value as any)?.from && (value as any)?.to;
      if (shouldCloseCalendar && inputElement.current) {
        inputElement.current.blur();
      }
    }, [value, isCalendarOpen]);

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
      e.persist();
      if (!isCalendarOpen) return;
      const isInnerElementFocused =
        calendarContainerElement.current &&
        calendarContainerElement.current.contains(e.relatedTarget as Node);
      if (shouldPreventToggle.current) {
        shouldPreventToggle.current = false;
        if (inputElement.current) inputElement.current.focus();
      } else if (isInnerElementFocused && e.relatedTarget) {
        (e.relatedTarget as HTMLElement).focus();
      } else {
        setCalendarVisibility(false);
      }
    };

    const openCalendar = () => {
      if (!shouldPreventToggle.current) setCalendarVisibility(true);
    };

    // Keep the calendar in the screen bounds if input is near the window edges
    useIsomorphicLayoutEffect(() => {
      if (!isCalendarOpen || !calendarContainerElement.current) return;
      const container = calendarContainerElement.current;
      const { left, width, height, top } = container.getBoundingClientRect();
      const { clientWidth, clientHeight } = document.documentElement;
      const isOverflowingFromRight = left + width > clientWidth;
      const isOverflowingFromLeft = left < 0;
      const isOverflowingFromBottom = top + height > clientHeight;

      const getLeftStyle = () => {
        const overflowFromRightDistance = left + width - clientWidth;
        if (!isOverflowingFromRight && !isOverflowingFromLeft) return '';
        const overflowFromLeftDistance = Math.abs(left);
        const rightPosition = isOverflowingFromLeft ? overflowFromLeftDistance : 0;

        return isOverflowingFromRight
          ? `calc(50% - ${overflowFromRightDistance}px)`
          : `calc(50% + ${rightPosition}px)`;
      };

      const leftStyle = getLeftStyle();
      if (leftStyle) container.style.left = leftStyle;
      if (
        (calendarPopperPosition === 'auto' && isOverflowingFromBottom) ||
        calendarPopperPosition === 'top'
      ) {
        container.classList.add('-top');
      }
    }, [isCalendarOpen, calendarPopperPosition]);

    const handleCalendarChange = (newValue: any) => {
      const valueType = getValueType(value);
      onChange(newValue);
      if (valueType === TYPE_SINGLE_DATE) setCalendarVisibility(false);
      else if (valueType === TYPE_RANGE && newValue?.from && newValue?.to) {
        setCalendarVisibility(false);
      }
    };

    const handleKeyUp = ({ key }: React.KeyboardEvent) => {
      switch (key) {
        case 'Enter':
          setCalendarVisibility(true);
          break;
        case 'Escape':
          setCalendarVisibility(false);
          shouldPreventToggle.current = true;
          break;
      }
    };

    useEffect(() => {
      if (!isCalendarOpen && shouldPreventToggle.current) {
        if (inputElement.current) inputElement.current.focus();
        shouldPreventToggle.current = false;
      }
    }, [isCalendarOpen]);

    return (
      <div
        ref={wrapperElement}
        onFocus={openCalendar}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
        className={`DatePicker ${wrapperClassName}`}
        role="presentation"
      >
        <DatePickerInput
          ref={inputElement}
          formatInputText={formatInputText}
          value={value}
          inputPlaceholder={inputPlaceholder}
          inputClassName={inputClassName}
          renderInput={renderInput}
          inputName={inputName}
          locale={locale}
        />
        {isCalendarOpen && (
          <>
            <div
              ref={calendarContainerElement}
              className="DatePicker__calendarContainer"
              data-testid="calendar-container"
              role="presentation"
              onMouseDown={() => {
                shouldPreventToggle.current = true;
              }}
            >
              <Calendar
                value={value}
                onChange={handleCalendarChange}
                calendarClassName={calendarClassName}
                calendarTodayClassName={calendarTodayClassName}
                calendarSelectedDayClassName={calendarSelectedDayClassName}
                calendarRangeStartClassName={calendarRangeStartClassName}
                calendarRangeBetweenClassName={calendarRangeBetweenClassName}
                calendarRangeEndClassName={calendarRangeEndClassName}
                disabledDays={disabledDays}
                colorPrimary={colorPrimary}
                colorPrimaryLight={colorPrimaryLight}
                slideAnimationDuration={slideAnimationDuration}
                onDisabledDayError={onDisabledDayError}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                selectorStartingYear={selectorStartingYear}
                selectorEndingYear={selectorEndingYear}
                locale={locale}
                shouldHighlightWeekends={shouldHighlightWeekends}
                renderFooter={renderFooter}
                customDaysClassName={customDaysClassName}
              />
            </div>
            <div className="DatePicker__calendarArrow" />
          </>
        )}
      </div>
    );
  },
);

DatePickerComponent.displayName = 'DatePicker';

export const DatePicker = DatePickerComponent as <TValue extends Value = Value>(
  props: DatePickerProps<TValue> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => React.ReactElement;

export default DatePicker;
