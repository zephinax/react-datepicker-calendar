import React, { useRef, useEffect } from 'react';

import { isSameDay } from '../shared/generalUtils';
import handleKeyboardNavigation from '../shared/keyboardNavigation';
import { useLocaleUtils, useLocaleLanguage } from '../shared/hooks';
import { Day, Locale } from '../shared/types';

interface MonthSelectorProps {
  activeDate: Day;
  maximumDate?: Day | null;
  minimumDate?: Day | null;
  onMonthSelect: (month: number) => void;
  isOpen: boolean;
  locale?: string | Locale;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({
  activeDate,
  maximumDate,
  minimumDate,
  onMonthSelect,
  isOpen,
  locale,
}) => {
  const monthSelector = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!monthSelector.current) return;
    const classToggleMethod = isOpen ? 'add' : 'remove';
    monthSelector.current.classList[classToggleMethod]('-open');
  }, [isOpen]);

  const { getMonthNumber, isBeforeDate } = useLocaleUtils(locale);
  const { months: monthsList } = useLocaleLanguage(locale);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    handleKeyboardNavigation(e, { allowVerticalArrows: false });
  };

  const renderMonthSelectorItems = () =>
    monthsList.map(monthName => {
      const monthNumber = getMonthNumber(monthName);
      const monthDate = { day: 1, month: monthNumber, year: activeDate.year };
      const isAfterMaximumDate =
        maximumDate && isBeforeDate(maximumDate, { ...monthDate, month: monthNumber });
      const isBeforeMinimumDate =
        minimumDate &&
        (isBeforeDate({ ...monthDate, month: monthNumber + 1 }, minimumDate) ||
          isSameDay({ ...monthDate, month: monthNumber + 1 }, minimumDate));
      const isSelected = monthNumber === activeDate.month;
      return (
        <li
          key={monthName}
          className={`Calendar__monthSelectorItem ${isSelected ? '-active' : ''}`}
        >
          <button
            tabIndex={isSelected && isOpen ? 0 : -1}
            onClick={() => {
              onMonthSelect(monthNumber);
            }}
            className="Calendar__monthSelectorItemText"
            type="button"
            disabled={Boolean(isAfterMaximumDate || isBeforeMinimumDate)}
            aria-pressed={isSelected}
            data-is-default-selectable={isSelected}
          >
            {monthName}
          </button>
        </li>
      );
    });

  return (
    <div
      role="presentation"
      className="Calendar__monthSelectorAnimationWrapper"
      {...(isOpen ? {} : { 'aria-hidden': true })}
    >
      <div
        role="presentation"
        data-testid="month-selector-wrapper"
        className="Calendar__monthSelectorWrapper"
        onKeyDown={handleKeyDown}
      >
        <ul ref={monthSelector} className="Calendar__monthSelector" data-testid="month-selector">
          {renderMonthSelectorItems()}
        </ul>
      </div>
    </div>
  );
};

export default MonthSelector;
