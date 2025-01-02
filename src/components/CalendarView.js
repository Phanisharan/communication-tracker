import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarView = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/admin-module/communications/`)
      .then(response => {
        const events = response.data.map(comm => ({
          title: `${comm.method.name}`,
          start: new Date(comm.date),
          end: new Date(comm.date),
        }));
        setEvents(events);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div style={{ height: '500px' }}>
      <h2>Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default CalendarView;
