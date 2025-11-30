import Link from 'next/link';

const codeExample = `import '@zephinax/react-datepicker-calendar/lib/DatePicker.css';
import DatePicker, { Calendar, utils } from '@zephinax/react-datepicker-calendar';

export function Example() {
  const [value, setValue] = useState(utils().getToday());
  return (
    <DatePicker
      value={value}
      onChange={setValue}
      inputPlaceholder="Choose a date"
      shouldHighlightWeekends
    />
  );
}`;

const features = [
  {
    title: 'Drop-in DatePicker',
    body: 'Input plus popper with auto-close after single or completed range selections.',
  },
  {
    title: 'Inline Calendar',
    body:
      'Embed the grid anywhere and keep the same selection logic for single, range, or multi-date.',
  },
  {
    title: 'Locale aware',
    body: 'English and Persian built-in, with a contract for custom calendars and digits.',
  },
  {
    title: 'Guardrails',
    body: 'Minimum/maximum dates, disabled days, and error callbacks prevent invalid picks.',
  },
  {
    title: 'Design friendly',
    body: 'Small CSS surface with class hooks for today, selection states, and custom days.',
  },
  {
    title: 'Keyboard ready',
    body: 'Arrow keys, Enter selection, focus management, and ARIA labels ship out of the box.',
  },
];

export default function HomePage() {
  return (
    <main className="flex-1 overflow-x-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100/80 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-14 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:gap-12">
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-sm ring-1 ring-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:ring-slate-800/60 sm:p-6 lg:p-8">
          <div className="pointer-events-none absolute inset-0 opacity-80">
            <div className="absolute -left-24 top-8 h-48 w-48 rounded-full bg-slate-200 blur-3xl dark:bg-slate-800" />
            <div className="absolute right-[-10%] top-1/3 h-56 w-56 rounded-full bg-slate-100 blur-3xl dark:bg-slate-700" />
            <div className="absolute left-1/2 bottom-0 h-64 w-64 -translate-x-1/2 rounded-full bg-slate-50 blur-3xl dark:bg-slate-800" />
          </div>
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="relative z-10 space-y-5 max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-200/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-700 dark:bg-slate-800/80 dark:text-slate-100 sm:px-4 sm:py-2 sm:text-xs">
                @zephinax/react-datepicker-calendar
              </span>
              <div className="space-y-3">
                <h1 className="text-3xl text-wrap font-semibold leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                  Beautiful, accessible date picking for React projects.
                </h1>
                <p className="text-base text-slate-600 dark:text-slate-200 sm:text-lg">
                  Ship single, range, or multi-date selection with localization, keyboard support,
                  and guardrails—without styling fights.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Link
                  href="/docs"
                  className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:shadow-slate-900/25 dark:bg-white dark:text-slate-900 dark:shadow-white/10"
                >
                  View documentation
                </Link>
                <a
                  href="https://www.npmjs.com/package/@zephinax/react-datepicker-calendar"
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                >
                  View on npm
                </a>
              </div>
              <dl className="flex flex-wrap gap-3 text-sm text-slate-700 dark:text-slate-200">
                <div className="flex-1 min-w-[180px] rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <dt className="text-slate-500 dark:text-slate-400">Selection modes</dt>
                  <dd className="text-base font-semibold text-slate-900 dark:text-white">
                    Single · Range · Multi
                  </dd>
                </div>
                <div className="flex-1 min-w-[180px] rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <dt className="text-slate-500 dark:text-slate-400">Locales</dt>
                  <dd className="text-base font-semibold text-slate-900 dark:text-white">
                    English · Persian · Custom
                  </dd>
                </div>
                <div className="flex-1 min-w-[180px] rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <dt className="text-slate-500 dark:text-slate-400">Accessibility</dt>
                  <dd className="text-base font-semibold text-slate-900 dark:text-white">
                    Keyboard & ARIA ready
                  </dd>
                </div>
              </dl>
            </div>

            <div className="relative z-10 flex-1 w-full">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-slate-200 via-white to-slate-100 blur-2xl dark:from-slate-800 dark:via-slate-900 dark:to-slate-800" />
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-300">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  <span className="ml-3 font-semibold text-slate-800 dark:text-white">
                    Example.tsx
                  </span>
                </div>
                <pre className="overflow-auto bg-slate-50 p-4 text-sm leading-relaxed text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:p-5">
                  <code>{codeExample}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
              Why teams pick this calendar
            </p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Built for production UI, focused on usability.
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {features.map(feature => (
              <article
                key={feature.title}
                className="w-full flex-1 min-w-[240px] rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-md dark:border-slate-800 dark:bg-slate-900 sm:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                Ready to build?
              </p>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                Dive into the docs and start integrating today.
              </h3>
            </div>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:shadow-slate-900/25 dark:bg-white dark:text-slate-900 dark:shadow-white/10"
            >
              Go to documentation
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
