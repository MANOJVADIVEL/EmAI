import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, User } from 'lucide-react';
import './AppointmentScheduler.css';

const AppointmentScheduler = () => {
  const [department, setDepartment] = useState('Cardiology');
  const [doctor, setDoctor] = useState('Dr. Sarah Johnson');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00 AM');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleSchedule = async () => {
    try {
      await axios.post('http://localhost:5000/appointments', {
        department,
        doctor,
        date,
        time,
      });
      fetchAppointments(); // Refresh the list
    } catch (error) {
      console.error('Error scheduling appointment:', error);
    }
  };

  return (
    <div className="appointment-container">
      <h2 className="section-title">Schedule an Appointment</h2>

      <div className="form-grid">
        <div className="form-section">
          <div className="form-group">
            <label className="form-label">Select Department</label>
            <select
              className="form-input"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option>Cardiology</option>
              <option>Neurology</option>
              <option>Orthopedics</option>
              <option>Pediatrics</option>
              <option>Oncologist</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Choose Doctor</label>
            <select
              className="form-input"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
            >
              <option>Dr. Sarah Johnson</option>
              <option>Dr. Michael Chen</option>
              <option>Dr. Emily Brown</option>
              <option>Dr. RamKumar</option>
              <option>Dr. siva</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Select Date</label>
            <input
              type="date"
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Select Time</label>
            <select
              className="form-input"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option>09:00 AM</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>02:00 PM</option>
              <option>03:00 PM</option>
              <option>04:00 PM</option>
            </select>
          </div>

          <button className="primary-button" onClick={handleSchedule}>
            Schedule Appointment
          </button>
        </div>

        <div className="appointments-section">
          <h3 className="sub-section-title">Upcoming Appointments</h3>
          <div className="appointments-list">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-header">
                  <User className="icon" />
                  <span className="doctor-name">{appointment.doctor}</span>
                </div>
                <div className="appointment-details">
                  <div className="detail-row">
                    <Calendar className="icon-small" />
                    <span>
                      {appointment.date}, {appointment.time}
                    </span>
                  </div>
                  <div className="detail-row">
                    <Clock className="icon-small" />
                    <span>Department: {appointment.department}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduler;
