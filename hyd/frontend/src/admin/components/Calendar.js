import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';

const AdminCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/calendar/all').then(res => setEvents(res.data));
  }, []);

  const handleCreateEvent = async () => {
    const createdBy = localStorage.getItem('userId');
    await axios.post('http://localhost:5000/api/calendar/create', {
      title,
      description: desc,
      date: selectedDate,
      createdBy,
    });
    setTitle('');
    setDesc('');
    const res = await axios.get('http://localhost:5000/api/calendar/all');
    setEvents(res.data);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📅 Admin Calendar</h2>
      <Calendar onChange={setSelectedDate} value={selectedDate} />
      <h3>Add Event on {selectedDate.toDateString()}</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" />
      <button onClick={handleCreateEvent}>Add Event</button>

      <h3>Upcoming Events</h3>
      {events.map(e => (
        <div key={e._id}>
          <strong>{new Date(e.date).toDateString()}</strong>: {e.title} — {e.description}
        </div>
      ))}
    </div>
  );
};

export default AdminCalendar;
