import { Day } from './types';
import { getDateAccordingToMonth } from './generalUtils';

interface SlideDateProps {
  parent: HTMLElement | null;
  isInitialActiveChild: boolean;
  activeDate: Day;
  monthChangeDirection: string;
}

const getSlideDate = ({ parent, isInitialActiveChild, activeDate, monthChangeDirection }: SlideDateProps): Day => {
  if (!parent) {
    return isInitialActiveChild ? activeDate : getDateAccordingToMonth(activeDate, 'NEXT');
  }
  const child = parent.children[isInitialActiveChild ? 0 : 1] as HTMLElement;
  if (!child) return activeDate;
  const isActiveSlide =
    child.classList.contains('-shown') || child.classList.contains('-shownAnimated');
  return isActiveSlide ? activeDate : getDateAccordingToMonth(activeDate, monthChangeDirection);
};

interface AnimateContentProps {
  parent: HTMLElement;
  direction: string;
}

const animateContent = ({ parent, direction }: AnimateContentProps): void => {
  const wrapperChildren = Array.from(parent.children) as HTMLElement[];
  const shownItem = wrapperChildren.find(child => child.classList.contains('-shown'));
  const hiddenItem = wrapperChildren.find(child => child !== shownItem);
  if (!shownItem || !hiddenItem) return;
  const baseClass = shownItem.classList[0];
  const isNextMonth = direction === 'NEXT';
  const getAnimationClass = (value: boolean) => (value ? '-hiddenNext' : '-hiddenPrevious');
  hiddenItem.style.transition = 'none';
  shownItem.style.transition = '';
  shownItem.className = `${baseClass} ${getAnimationClass(!isNextMonth)}`;
  hiddenItem.className = `${baseClass} ${getAnimationClass(isNextMonth)}`;
  hiddenItem.classList.add('-shownAnimated');
};

const handleSlideAnimationEnd = ({ target }: { target: any }): void => {
  if (!target || !target.classList) return;
  target.classList.remove('-hiddenNext');
  target.classList.remove('-hiddenPrevious');
  target.classList.replace('-shownAnimated', '-shown');
};

export { animateContent, getSlideDate, handleSlideAnimationEnd };
