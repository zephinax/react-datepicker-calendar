import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../../src/DatePicker.css';
import DatePicker from '../../src';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const [selectedDay, setValue] = useState(null);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginInline: '18px',
      }}
    >
      {/* Header */}
      <header
        style={{
          width: '100%',
          backgroundColor: '#ffffff',
          padding: '15px 0',
          textAlign: 'center',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          marginBottom: '30px',
          borderRadius: '10px',
        }}
      >
        <h1
          style={{
            margin: '0',
            fontSize: '4em',
            color: '#1a3c6d',
            fontWeight: '600',
          }}
        >
          React Datepicker Calendar
        </h1>
        <p
          style={{
            margin: '5px 0 0',
            color: '#5a6a85',
            fontSize: '2.1em',
          }}
        >
          Easily select your desired date
        </p>
      </header>

      {/* Main Content */}
      <main
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '25px',
          maxWidth: '1000px',
          width: '100%',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {/* Description Card */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '25px',
            maxWidth: '450px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            transition: 'transform 0.2s ease-in-out',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <h2
            style={{
              fontSize: '2.6em',
              color: '#1a3c6d',
              margin: '0 0 15px',
              fontWeight: '500',
            }}
          >
            About React Datepicker Calendar
          </h2>
          <p
            style={{
              color: '#4a5568',
              lineHeight: '1.7',
              fontSize: '1.6em',
              margin: '0',
            }}
          >
            React Datepicker Calendar is a powerful and flexible date selection component for React
            applications. It features weekend highlighting, smooth date selection, and an intuitive
            interface that integrates seamlessly into any project.
          </p>
        </div>

        {/* Date Picker Card */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            textAlign: 'center',
            maxWidth: '350px',
          }}
        >
          <h2
            style={{
              fontSize: '2.6em',
              color: '#1a3c6d',
              margin: '0 0 20px',
              fontWeight: '500',
            }}
          >
            Pick a Date
          </h2>
          <div
            style={{
              padding: '15px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              marginBottom: '15px',
            }}
          >
            <DatePicker value={selectedDay} onChange={setValue} shouldHighlightWeekends />
          </div>
        </div>
      </main>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
