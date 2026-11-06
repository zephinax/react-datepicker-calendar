'use client';

import Link from 'next/link';
import { useState } from 'react';
import DatePicker, { Calendar, utils } from '@zephinax/react-datepicker-calendar';
import type { DayValue, DayRange, Day } from '@zephinax/react-datepicker-calendar';
import {
  Calendar as CalendarIcon,
  Check,
  Copy,
  Globe,
  Sparkles,
  Terminal,
  ShieldCheck,
  Palette,
  Keyboard,
  ArrowRight,
  ExternalLink,
  Layers,
} from 'lucide-react';

type Mode = 'single' | 'range' | 'multi';
type LocaleOption = 'en' | 'fa';
type ViewComponent = 'datepicker' | 'calendar';
type PkgManager = 'bun' | 'npm' | 'pnpm' | 'yarn';

export default function HomePage() {
  const [mode, setMode] = useState<Mode>('single');
  const [locale, setLocale] = useState<LocaleOption>('en');
  const [viewComponent, setViewComponent] = useState<ViewComponent>('datepicker');
  const [pkgManager, setPkgManager] = useState<PkgManager>('bun');
  const [copied, setCopied] = useState(false);

  // Demo selection states
  const today = utils(locale).getToday();
  const [singleValue, setSingleValue] = useState<DayValue>(today);
  const [rangeValue, setRangeValue] = useState<DayRange>({
    from: today,
    to: { ...today, day: Math.min(today.day + 5, 28) },
  });
  const [multiValue, setMultiValue] = useState<Day[]>([
    today,
    { ...today, day: Math.min(today.day + 3, 28) },
    { ...today, day: Math.min(today.day + 7, 28) },
  ]);

  const installCommands: Record<PkgManager, string> = {
    bun: 'bun add @zephinax/react-datepicker-calendar',
    npm: 'npm install @zephinax/react-datepicker-calendar',
    pnpm: 'pnpm add @zephinax/react-datepicker-calendar',
    yarn: 'yarn add @zephinax/react-datepicker-calendar',
  };

  const copyInstallCommand = () => {
    navigator.clipboard.writeText(installCommands[pkgManager]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getActiveCode = () => {
    const isDatePicker = viewComponent === 'datepicker';
    const compName = isDatePicker ? 'DatePicker' : 'Calendar';

    if (mode === 'single') {
      return `import ${compName}, { utils } from '@zephinax/react-datepicker-calendar';
import '@zephinax/react-datepicker-calendar/style.css';

export function Example() {
  const [selectedDay, setSelectedDay] = useState(utils('${locale}').getToday());

  return (
    <${compName}
      value={selectedDay}
      onChange={setSelectedDay}
      locale="${locale}"
      shouldHighlightWeekends
    />
  );
}`;
    }

    if (mode === 'range') {
      return `import ${compName} from '@zephinax/react-datepicker-calendar';
import '@zephinax/react-datepicker-calendar/style.css';

export function Example() {
  const [selectedRange, setSelectedRange] = useState({
    from: { year: ${today.year}, month: ${today.month}, day: ${today.day} },
    to: { year: ${today.year}, month: ${today.month}, day: ${Math.min(today.day + 5, 28)} },
  });

  return (
    <${compName}
      value={selectedRange}
      onChange={setSelectedRange}
      locale="${locale}"
      shouldHighlightWeekends
    />
  );
}`;
    }

    return `import ${compName} from '@zephinax/react-datepicker-calendar';
import '@zephinax/react-datepicker-calendar/style.css';

export function Example() {
  const [selectedDays, setSelectedDays] = useState([
    { year: ${today.year}, month: ${today.month}, day: ${today.day} },
  ]);

  return (
    <${compName}
      value={selectedDays}
      onChange={setSelectedDays}
      locale="${locale}"
      shouldHighlightWeekends
    />
  );
}`;
  };

  const getCurrentDisplayValue = () => {
    if (mode === 'single') return JSON.stringify(singleValue, null, 2);
    if (mode === 'range') return JSON.stringify(rangeValue, null, 2);
    return JSON.stringify(multiValue, null, 2);
  };

  return (
    <main className="flex-1 overflow-x-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100/80 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:gap-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl ring-1 ring-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:ring-slate-800/60 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-rose-200 blur-3xl dark:bg-rose-950/40" />
            <div className="absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-blue-200 blur-3xl dark:bg-blue-950/40" />
          </div>

          <div className="relative z-10 flex flex-col gap-8 max-w-3xl">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-rose-200 bg-rose-50/80 px-3.5 py-1.5 text-xs font-semibold text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/60 dark:text-rose-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>v1.2.0 • React 19 & Next.js RSC Ready</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                Modern, accessible date picking for React.
              </h1>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl">
                Single, range, and multi-date selection with seamless Persian (Jalali) & Gregorian
                calendars, smooth sliding animations, and native TypeScript types.
              </p>
            </div>

            {/* Install Command Switcher */}
            <div className="flex flex-col gap-2 max-w-lg">
              <div className="flex items-center gap-1">
                {(['bun', 'npm', 'pnpm', 'yarn'] as PkgManager[]).map(pm => (
                  <button
                    key={pm}
                    onClick={() => setPkgManager(pm)}
                    className={`rounded-t-lg px-3 py-1 text-xs font-medium transition ${
                      pkgManager === pm
                        ? 'bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-100'
                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                  >
                    {pm}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between rounded-xl rounded-tl-none border border-slate-200 bg-slate-900 px-4 py-3 font-mono text-xs text-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:text-sm">
                <div className="flex items-center gap-2 overflow-x-auto">
                  <Terminal className="h-4 w-4 shrink-0 text-slate-400" />
                  <code>{installCommands[pkgManager]}</code>
                </div>
                <button
                  onClick={copyInstallCommand}
                  aria-label="Copy install command"
                  className="ml-3 shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:shadow-slate-900/25 dark:bg-white dark:text-slate-900 dark:shadow-white/10"
              >
                <span>Read Documentation</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://github.com/zephinax/react-datepicker-calendar"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <span>GitHub</span>
                <ExternalLink className="h-4 w-4 text-slate-400" />
              </a>
              <a
                href="https://www.npmjs.com/package/@zephinax/react-datepicker-calendar"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <span>npm Package</span>
                <ExternalLink className="h-4 w-4 text-slate-400" />
              </a>
            </div>
          </div>
        </section>

        {/* Interactive Live Demo Playground */}
        <section className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl ring-1 ring-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 dark:ring-slate-800/60 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-6 dark:border-slate-800">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Interactive Showcase
              </p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                Test the Datepicker & Calendar live
              </h2>
            </div>

            {/* Component and Locale Selector Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
                <button
                  onClick={() => setViewComponent('datepicker')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    viewComponent === 'datepicker'
                      ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
                  }`}
                >
                  &lt;DatePicker /&gt;
                </button>
                <button
                  onClick={() => setViewComponent('calendar')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    viewComponent === 'calendar'
                      ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
                  }`}
                >
                  &lt;Calendar /&gt;
                </button>
              </div>

              <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
                <button
                  onClick={() => setLocale('en')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    locale === 'en'
                      ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
                  }`}
                >
                  🇺🇸 Gregorian (en)
                </button>
                <button
                  onClick={() => setLocale('fa')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    locale === 'fa'
                      ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
                  }`}
                >
                  🇮🇷 Jalali (fa)
                </button>
              </div>
            </div>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Mode:</span>
            {(['single', 'range', 'multi'] as Mode[]).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-lg border px-3.5 py-1.5 text-xs font-semibold capitalize transition ${
                  mode === m
                    ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {m === 'single' ? 'Single date' : m === 'range' ? 'Date range' : 'Multiple dates'}
              </button>
            ))}
          </div>

          {/* Interactive Component and Code Grid */}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Interactive Preview Panel */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50/60 p-6 min-h-[380px] dark:border-slate-800 dark:bg-slate-950/60 lg:col-span-5">
              {viewComponent === 'datepicker' ? (
                <div className="w-full flex flex-col items-center gap-3">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Click input to open popper calendar:
                  </span>
                  {mode === 'single' && (
                    <DatePicker
                      value={singleValue}
                      onChange={setSingleValue}
                      locale={locale}
                      inputPlaceholder="Select date"
                      shouldHighlightWeekends
                    />
                  )}
                  {mode === 'range' && (
                    <DatePicker
                      value={rangeValue}
                      onChange={setRangeValue}
                      locale={locale}
                      inputPlaceholder="Select date range"
                      shouldHighlightWeekends
                    />
                  )}
                  {mode === 'multi' && (
                    <DatePicker
                      value={multiValue}
                      onChange={setMultiValue}
                      locale={locale}
                      inputPlaceholder="Select multiple dates"
                      shouldHighlightWeekends
                    />
                  )}
                </div>
              ) : (
                <div className="w-full flex flex-col items-center">
                  {mode === 'single' && (
                    <Calendar
                      value={singleValue}
                      onChange={setSingleValue}
                      locale={locale}
                      shouldHighlightWeekends
                    />
                  )}
                  {mode === 'range' && (
                    <Calendar
                      value={rangeValue}
                      onChange={setRangeValue}
                      locale={locale}
                      shouldHighlightWeekends
                    />
                  )}
                  {mode === 'multi' && (
                    <Calendar
                      value={multiValue}
                      onChange={setMultiValue}
                      locale={locale}
                      shouldHighlightWeekends
                    />
                  )}
                </div>
              )}
            </div>

            {/* Live Code and Output Inspector */}
            <div className="flex flex-col gap-4 lg:col-span-7">
              {/* Code Card */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Live Component Code
                  </span>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-mono dark:bg-slate-800">
                    TypeScript
                  </span>
                </div>
                <pre className="overflow-x-auto p-4 text-xs font-mono leading-relaxed text-slate-800 dark:text-slate-200">
                  <code>{getActiveCode()}</code>
                </pre>
              </div>

              {/* State JSON Output */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Current value state ({mode})
                  </span>
                </div>
                <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-50 p-3 text-xs font-mono text-emerald-600 dark:bg-slate-900 dark:text-emerald-400">
                  <code>{getCurrentDisplayValue()}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="space-y-6">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Engineered for developer experience.
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300">
              Everything you need to ship world-class date pickers with zero configuration headaches.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 inline-flex rounded-xl bg-rose-50 p-3 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">React 19 & RSC Ready</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Built-in <code>&quot;use client&quot;</code> banners, forwardRef support, and isomorphic layout
                effects ensure seamless Next.js App Router and Server Component integration.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 inline-flex rounded-xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Dual Calendar Systems</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                First-class Gregorian and Persian (Jalali) engines built-in with proper month lengths,
                RTL direction, Persian numerals, and weekend highlighting.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 inline-flex rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">3 Selection Modes</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Easily toggle between single date, range selection with starting/ending boundaries, or
                multiple individual date selections with identical prop signatures.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 inline-flex rounded-xl bg-amber-50 p-3 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                <Keyboard className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Accessible by Default</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Complete keyboard navigation: arrow keys for day hopping, Enter for selection, Escape
                to close, and full ARIA grid and role semantics for screen readers.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Strict Guardrails</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Set minimum and maximum selectable bounds, specify disabled date arrays, and handle
                invalid date picks smoothly via <code>onDisabledDayError</code> callbacks.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 inline-flex rounded-xl bg-purple-50 p-3 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
                <Palette className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">CSS Variable Theming</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Customize primary and accent colors seamlessly via <code>colorPrimary</code>, CSS
                variables, or inject custom class names for specific milestone days.
              </p>
            </article>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-950 sm:p-12">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-rose-500 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-blue-500 blur-3xl" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                Ready to integrate into your application?
              </h3>
              <p className="text-sm text-slate-300 sm:text-base">
                Check out the full API reference, usage patterns, and styling guide.
              </p>
            </div>
            <Link
              href="/docs"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-md transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              <span>Explore Documentation</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
