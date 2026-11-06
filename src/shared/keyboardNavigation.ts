import React from 'react';

interface KeyboardNavigationOptions {
  allowVerticalArrows?: boolean;
}

const handleArrowKeys = (
  e: React.KeyboardEvent | KeyboardEvent,
  { allowVerticalArrows = false }: KeyboardNavigationOptions,
): void => {
  const activeElement = document.activeElement as HTMLElement | null;
  if (!activeElement || !activeElement.parentElement) return;

  const getNthChildSafe = (element: Element | null, index: number): HTMLElement | null =>
    (element ? (element.children[index] as HTMLElement) : null);

  const getStandardItem = (item: HTMLElement | null): HTMLElement | null =>
    item && item.hasAttribute('aria-hidden') ? null : item;

  const parent = activeElement.parentElement;
  const nextRow = parent.nextElementSibling;
  const previousRow = parent.previousElementSibling;

  const nextSibling = getStandardItem(
    (activeElement.nextElementSibling as HTMLElement) || getNthChildSafe(nextRow, 0),
  );
  const previousRowLength = previousRow ? previousRow.children.length - 1 : 0;
  const previousSibling = getStandardItem(
    (activeElement.previousElementSibling as HTMLElement) ||
      getNthChildSafe(previousRow, previousRowLength),
  );
  const getVerticalSibling = (row: Element | null) =>
    getNthChildSafe(row, Array.from(parent.children).indexOf(activeElement));
  const downSibling = getStandardItem(getVerticalSibling(nextRow));
  const upSibling = getStandardItem(getVerticalSibling(previousRow));
  const isDefaultSelectable = activeElement.dataset.isDefaultSelectable === 'true';

  if (!isDefaultSelectable) activeElement.tabIndex = -1;
  const focusIfAvailable = (element: HTMLElement | null) => {
    e.preventDefault();
    /* istanbul ignore else */
    if (element) {
      element.setAttribute('tabindex', '0');
      element.focus();
    }
  };

  switch (e.key) {
    case 'ArrowRight':
      focusIfAvailable(nextSibling);
      break;
    case 'ArrowLeft':
      focusIfAvailable(previousSibling);
      break;
    case 'ArrowDown':
      /* istanbul ignore else */
      if (allowVerticalArrows) focusIfAvailable(downSibling);
      break;
    case 'ArrowUp':
      /* istanbul ignore else */
      if (allowVerticalArrows) focusIfAvailable(upSibling);
      break;
  }
};

export default handleArrowKeys;
