# react-modern-calendar-datepicker

A lightweight and easy-to-use React date picker package with support for multiple languages (currently `en` and `fa` locales). This package is built with React hooks and inherits the font-family from your project for seamless integration.

## Important Notes
- **React Version**: Requires `react >= 16.8.0` for hook support.
- **Font Recommendation**: For `fa` locale, use **Iran Yekan** (primary) or **Iran Sans** for the best user experience.

## Installation
Install via Yarn:
```bash
yarn add react-modern-calendar-datepicker
```

Or via NPM:
```bash
npm i react-modern-calendar-datepicker
```

## Basic Import
```javascript
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
```

## Core Concepts
The package provides two main components:
- **`<DatePicker />`**: Default-exported component with an input and calendar.
- **`<Calendar />`**: Standalone calendar component.

Both components share most props. Use the `locale` prop to switch languages (e.g., `locale="fa"`).

## Basic Usage
### Single Date Picker
```javascript
import React, { useState } from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';

const App = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  return (
    <DatePicker
      value={selectedDay}
      onChange={setSelectedDay}
      inputPlaceholder="Select a day"
      shouldHighlightWeekends
    />
  );
};

export default App;
```

### Range Date Picker
```javascript
import React, { useState } from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from 'react-modern-calendar-datepicker';

const App = () => {
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  });
  return (
    <Calendar
      value={selectedDayRange}
      onChange={setSelectedDayRange}
      shouldHighlightWeekends
    />
  );
};

export default App;
```

### Multiple Date Picker
```javascript
import React, { useState } from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from 'react-modern-calendar-datepicker';

const App = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  return (
    <Calendar
      value={selectedDays}
      onChange={setSelectedDays}
      shouldHighlightWeekends
    />
  );
};

export default App;
```

## Default Values
### Single Date
```javascript
const defaultValue = { year: 2019, month: 10, day: 5 };
const [selectedDay, setSelectedDay] = useState(defaultValue);
```

### Range Date
```javascript
const defaultRange = {
  from: { year: 2019, month: 3, day: 4 },
  to: { year: 2019, month: 3, day: 7 },
};
const [selectedDayRange, setSelectedDayRange] = useState(defaultRange);
```

### Multiple Dates
```javascript
const preselectedDays = [
  { year: 2019, month: 10, day: 2 },
  { year: 2019, month: 10, day: 15 },
  { year: 2019, month: 10, day: 30 },
];
const [selectedDays, setSelectedDays] = useState(preselectedDays);
```

## Minimum & Maximum Date
Restrict date selection with `minimumDate` and `maximumDate`:
```javascript
import { utils } from 'react-modern-calendar-datepicker';

<Calendar
  value={selectedDay}
  onChange={setSelectedDay}
  minimumDate={utils().getToday()}
  shouldHighlightWeekends
/>
```

## Tutorial
- **Getting Started**: Installation and basic setup.
- **Core Concepts**: Understand `<DatePicker />` and `<Calendar />`.
- **Default Values**: Set predefined dates.
- **Minimum & Maximum Date**: Limit date selection.
- **Disabled Day(s)**: Disable specific dates.
- **Customization**: Style and behavior tweaks.
- **Responsive Guide**: Ensure mobile compatibility.
- **Utilities**: Helper functions like `utils().getToday()`.
- **Different Locales**: Support for `en` and `fa` locales.
- **TypeScript**: Type definitions for TypeScript users.

For a detailed props list and advanced usage, visit the [official documentation](#).
