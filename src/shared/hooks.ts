import { useMemo, useEffect, useLayoutEffect } from 'react';

import utils from './localeUtils';
import getLanguageText from './localeLanguages';
import { Locale, Utils } from './types';

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const useLocaleUtils = (locale?: string | Locale): Utils =>
  useMemo(() => utils(locale), [locale]);

export const useLocaleLanguage = (locale?: string | Locale): Locale =>
  useMemo(() => getLanguageText(locale), [locale]);
