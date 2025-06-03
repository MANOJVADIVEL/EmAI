import React, { useEffect, useState } from 'react';
import { Bed, Trash2 } from 'lucide-react';
import './BedAllotment.css';

const BedAllotment = () => {
  const [floors, setFloors] = useState([]);
  const [patientName, setPatientName] = useState('');
  const [cause, setCause] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [hoveredBed, setHoveredBed] = useState<{ floor: string; bedNumber: number } | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/beds')
      .then((res) => res.json())
      .then((data) => setFloors(data));
  }, []);

  const requestBed = () => {
    if (!patientName || !selectedFloor || !cause || !dischargeDate) {
      alert('Please enter all patient details');
      return;
    }

    fetch('http://localhost:4000/allot-bed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientName, floorName: selectedFloor, cause, dischargeDate }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setPatientName('');
        setCause('');
        setDischargeDate('');
        setSelectedFloor('');
        return fetch('http://localhost:4000/beds');
      })
      .then((res) => res.json())
      .then((data) => setFloors(data))
      .catch((err) => console.error('Error:', err));
  };

  const dischargePatient = (floorName: string, bedNumber: number) => {
    fetch('http://localhost:4000/discharge-patient', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ floorName, bedNumber }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        return fetch('http://localhost:4000/beds');
      })
      .then((res) => res.json())
      .then((data) => setFloors(data))
      .catch((err) => console.error('Error:', err));
  };

  return (
    <div className="containers">
      <h2 className="title">🏥 Bed Allotment System</h2>

      <div className="grid-container">
        <div className="beds-section">
          <h3 className="section-heading">🏢 Available Beds</h3>
          <div className="floor-list">
            {floors.map((floor) => (
              <div key={floor.id} className="floor-card">
                <h4 className="floor-name">{floor.name}</h4>
                <span className="availability">
                  {floor.available} / {floor.totalBeds} available
                </span>

                <div className="beds-grid">
                  {floor.beds.map((bed) => (
                    <div
                      key={bed.bedNumber}
                      className={`bed ${bed.occupied ? 'occupied-bed' : 'available-bed'}`}
                      onMouseEnter={() => setHoveredBed({ floor: floor.name, bedNumber: bed.bedNumber })}
                      onMouseLeave={() => setHoveredBed(null)}
                    >
                      <span className="bed-number">Bed {bed.bedNumber}</span>
                      <Bed className="bed-icon" />

                      {hoveredBed?.floor === floor.name &&
                        hoveredBed?.bedNumber === bed.bedNumber &&
                        bed.occupied && (
                          <>
                            <div className="tooltip">
                              <p><strong>Bed:</strong> {bed.bedNumber}</p>
                              <p><strong>Patient:</strong> {bed.patientName}</p>
                              <p><strong>Cause:</strong> {bed.cause}</p>
                              <p><strong>Discharge:</strong> {bed.dischargeDate}</p>
                            </div>
                            <button
                              className="discharge-btn"
                              onClick={() => dischargePatient(floor.name, bed.bedNumber)}
                            >
                              <Trash2 className="icon" /> Discharge
                            </button>
                          </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-heading">📋 Request Bed Allotment</h3>
          <form className="bed-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Patient Name</label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter patient name"
              />
            </div>
            <div className="form-group">
              <label>Cause</label>
              <input
                type="text"
                value={cause}
                onChange={(e) => setCause(e.target.value)}
                placeholder="Enter cause"
              />
            </div>
            <div className="form-group">
              <label>Discharge Date</label>
              <input
                type="date"
                value={dischargeDate}
                onChange={(e) => setDischargeDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Floor Preference</label>
              <select
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
              >
                <option value="">Select a floor</option>
                {floors.map((floor) => (
                  <option key={floor.id} value={floor.name}>
                    {floor.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="button" onClick={requestBed} className="submit-btn">
              Request Bed
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BedAllotment;
