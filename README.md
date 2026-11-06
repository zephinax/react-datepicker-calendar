# @zephinax/react-datepicker-calendar

<p align="center">
  <a href="https://react-datepicker-calendar.zephinax.com"><strong>Explore Documentation & Interactive Demo →</strong></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@zephinax/react-datepicker-calendar"><img src="https://img.shields.io/npm/v/@zephinax/react-datepicker-calendar.svg?style=flat-square&color=crimson" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@zephinax/react-datepicker-calendar"><img src="https://img.shields.io/npm/dm/@zephinax/react-datepicker-calendar.svg?style=flat-square&color=blue" alt="npm downloads" /></a>
  <a href="https://bundlephobia.com/package/@zephinax/react-datepicker-calendar"><img src="https://img.shields.io/bundlephobia/minzip/@zephinax/react-datepicker-calendar?style=flat-square&color=emerald" alt="bundle size" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/npm/l/@zephinax/react-datepicker-calendar?style=flat-square&color=purple" alt="license" /></a>
</p>

---

A modern, accessible, and highly customizable React date picker and calendar library for **React 18 & 19**. Features single, range, and multi-date selection, native **TypeScript** types, smooth slide animations, and first-class support for both **Gregorian** and **Persian (Jalali)** calendars.

---

## ✨ Features

* ⚛️ **React 18 & 19 Ready**: Full support for React Server Components (Next.js App Router `"use client"`) and `React.forwardRef`.
* 🌍 **Dual Calendar Engines**: Seamless support for Gregorian (US/English) and Persian (Jalali/Farsi) calendar algorithms.
* 🎯 **3 Selection Modes**: Single date, date range (`from` / `to`), and multiple date selections.
* 📘 **100% Native TypeScript**: Strict, type-safe prop contracts and exported type definitions.
* 📦 **Dual ESM & CommonJS**: Optimized modern bundles built with `tsup`.
* ⌨️ **Accessible (a11y)**: Complete keyboard navigation (Arrow keys, Enter, Escape) and full ARIA grid semantics.
* 🎨 **Themeable & Lightweight**: CSS variable hooks (`--cl-color-primary`, etc.) and zero heavy third-party styling dependencies.

---

## 📦 Installation

```bash
# Bun
bun add @zephinax/react-datepicker-calendar

# NPM
npm install @zephinax/react-datepicker-calendar

# PNPM
pnpm add @zephinax/react-datepicker-calendar

# Yarn
yarn add @zephinax/react-datepicker-calendar
```

---

## 🚀 Quick Start

Import the components and the stylesheet:

```tsx
import React, { useState } from 'react';
import DatePicker, { utils } from '@zephinax/react-datepicker-calendar';
import type { DayValue } from '@zephinax/react-datepicker-calendar';
import '@zephinax/react-datepicker-calendar/style.css';

export default function App() {
  const [selectedDay, setSelectedDay] = useState<DayValue>(utils('en').getToday());

  return (
    <DatePicker
      value={selectedDay}
      onChange={setSelectedDay}
      inputPlaceholder="Select a date"
      shouldHighlightWeekends
    />
  );
}
```

---

## 🗓️ Selection Modes

### 1. Single Date
```tsx
import React, { useState } from 'react';
import DatePicker from '@zephinax/react-datepicker-calendar';
import type { DayValue } from '@zephinax/react-datepicker-calendar';
import '@zephinax/react-datepicker-calendar/style.css';

const [day, setDay] = useState<DayValue>(null);

<DatePicker
  value={day}
  onChange={setDay}
  inputPlaceholder="Select day"
/>
```

### 2. Range Picker (`from` / `to`)
```tsx
import React, { useState } from 'react';
import { Calendar } from '@zephinax/react-datepicker-calendar';
import type { DayRange } from '@zephinax/react-datepicker-calendar';
import '@zephinax/react-datepicker-calendar/style.css';

const [range, setRange] = useState<DayRange>({ from: null, to: null });

<Calendar
  value={range}
  onChange={setRange}
  shouldHighlightWeekends
/>
```

### 3. Multiple Dates Selection
```tsx
import React, { useState } from 'react';
import { Calendar } from '@zephinax/react-datepicker-calendar';
import type { Day } from '@zephinax/react-datepicker-calendar';
import '@zephinax/react-datepicker-calendar/style.css';

const [days, setDays] = useState<Day[]>([]);

<Calendar
  value={days}
  onChange={setDays}
  shouldHighlightWeekends
/>
```

---

## 🌍 Locales & Persian (Jalali) Support

Switch to the Persian calendar simply by passing `locale="fa"`:

```tsx
import React, { useState } from 'react';
import DatePicker, { utils } from '@zephinax/react-datepicker-calendar';
import type { DayValue } from '@zephinax/react-datepicker-calendar';
import '@zephinax/react-datepicker-calendar/style.css';

export default function PersianDatePicker() {
  const [day, setDay] = useState<DayValue>(utils('fa').getToday());

  return (
    <DatePicker
      value={day}
      onChange={setDay}
      locale="fa"
      shouldHighlightWeekends
    />
  );
}
```

> **Font Recommendation for Persian UI**: For optimal typography with `locale="fa"`, use **Iran Yekan** or **Vazirmatn**.

---

## 🛡️ Guardrails & Date Restrictions

Prevent invalid dates with `minimumDate`, `maximumDate`, and `disabledDays`:

```tsx
import { Calendar, utils } from '@zephinax/react-datepicker-calendar';

const today = utils('en').getToday();

<Calendar
  value={selectedDay}
  onChange={setSelectedDay}
  minimumDate={today}
  maximumDate={{ year: today.year, month: today.month + 3, day: 1 }}
  disabledDays={[
    { year: 2026, month: 11, day: 15 },
    { year: 2026, month: 11, day: 20 },
  ]}
  onDisabledDayError={(day) => alert(`Date ${day.year}/${day.month}/${day.day} is unavailable.`)}
/>
```

---

## 🎨 Customizing Styles

You can customize the theme colors and transition speeds via props or CSS variables:

```tsx
<Calendar
  value={selectedDay}
  onChange={setSelectedDay}
  colorPrimary="#0ea5e9"
  colorPrimaryLight="#e0f2fe"
  slideAnimationDuration="0.3s"
/>
```

Or globally via CSS:

```css
.Calendar {
  --cl-color-primary: #0ea5e9;
  --cl-color-primary-light: #e0f2fe;
  --animation-duration: 0.3s;
}
```

---

## ⚙️ Props Reference

### `<Calendar />` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `DayValue \| DayRange \| Day[]` | `null` | Current selected date value |
| `onChange` | `(value: any) => void` | `undefined` | Callback fired on date selection |
| `locale` | `'en' \| 'fa' \| Locale` | `'en'` | Calendar system & language |
| `minimumDate` | `Day` | `null` | Earliest selectable date |
| `maximumDate` | `Day` | `null` | Latest selectable date |
| `disabledDays` | `Day[]` | `[]` | List of dates that cannot be selected |
| `onDisabledDayError` | `(day: Day) => void` | `undefined` | Callback fired when a disabled day is clicked |
| `shouldHighlightWeekends` | `boolean` | `false` | Highlight weekend days |
| `colorPrimary` | `string` | `'#d24670'` | Main brand accent color |
| `colorPrimaryLight` | `string` | `'#edadc0'` | Secondary highlight color (ranges) |
| `slideAnimationDuration` | `string` | `'0.4s'` | Duration of month slide transitions |
| `renderFooter` | `() => ReactNode` | `undefined` | Custom footer element |
| `customDaysClassName` | `CustomDayClassNameItem[]` | `[]` | Custom CSS classes for specific dates |

### `<DatePicker />` Props (Inherits all `<Calendar />` props)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `inputPlaceholder` | `string` | `'Select date'` | Input placeholder text |
| `inputClassName` | `string` | `''` | Custom CSS class for the input field |
| `wrapperClassName` | `string` | `''` | Custom CSS class for the wrapper element |
| `formatInputText` | `() => string` | `undefined` | Custom input formatting function |
| `calendarPopperPosition` | `'auto' \| 'top' \| 'bottom'` | `'auto'` | Popover positioning strategy |
| `renderInput` | `(props) => ReactNode` | `undefined` | Custom input render prop |

---

## 📖 Documentation & Interactive Demo

For comprehensive guides, live interactive examples, and API references, check out:
👉 **[https://react-datepicker-calendar.zephinax.com](https://react-datepicker-calendar.zephinax.com)**

---

## 📄 License

MIT © [Zephinax](https://github.com/zephinax)
