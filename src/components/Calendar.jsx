import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

function MyCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <Calendar onChange={setDate} value={date}/>
    </div>
  );
}

export default MyCalendar;

