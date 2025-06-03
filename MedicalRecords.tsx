import React, { useEffect, useState } from 'react';
import { FileText, Lock, Download, Share2 } from 'lucide-react';
import './MedicalRecords.css';

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    doctor: '',
    type: '',
  });

  useEffect(() => {
    fetch('http://localhost:3000/records')
      .then((res) => res.json())
      .then((data) => setRecords(data))
      .catch((err) => console.error(err));
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = async () => {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('date', formData.date);
    data.append('doctor', formData.doctor);
    data.append('type', formData.type);
    data.append('file', file);

    await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: data,
    });

    window.location.reload();
  };

  return (
    <div className="medical-container">
      <div className="header">
        <h2 className="heading">Medical Records</h2>
        <div className="encryption-info">
          <Lock className="icon lock-icon" />
          <span className="encryption-text">End-to-end encrypted</span>
        </div>
      </div>

      <div className="content-grid">
        <div className="records-section">
          <div className="records-box">
            <div className="records-header">
              <h3 className="section-title">Recent Records</h3>
            </div>
            <div className="record-list">
              {records.map((record, index) => (
                <div key={index} className="record-item">
                  <div className="record-details">
                    <h4 className="record-title">{record.title}</h4>
                    <p className="record-meta">{record.doctor} • {record.date}</p>
                  </div>
                  <div className="record-actions">
                    <a href={`http://localhost:3000/uploads/${record.file}`} download>
                      <button className="icon-btn">
                        <Download className="icon download-icon" />
                      </button>
                    </a>
                    <button className="icon-btn">
                      <Share2 className="icon share-icon" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="upload-box">
            <h3 className="section-title">Upload New Record</h3>
            <div className="upload-form">
              <FileText className="icon file-icon" />
              <input type="file" onChange={handleFileChange} className="input" />
              <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={handleInputChange}
                className="input"
              />
              <input
                type="date"
                name="date"
                onChange={handleInputChange}
                className="input"
              />
              <input
                type="text"
                name="doctor"
                placeholder="Doctor Name"
                onChange={handleInputChange}
                className="input"
              />
              <input
                type="text"
                name="type"
                placeholder="Type (e.g., Report)"
                onChange={handleInputChange}
                className="input"
              />
              <button onClick={handleUpload} className="upload-btn">Upload</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;
