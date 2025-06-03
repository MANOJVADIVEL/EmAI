//import React from 'react';
import axios from 'axios';

function Emergency() {
    const sendEmergencySMS = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    try {
                        const response = await axios.post('http://localhost:8000/send-emergency-sms', {
                            latitude,
                            longitude,
                        });
                        alert(response.data.message);
                    } catch  {
                        alert('Failed to send SMS');
                    }
                },
                () => alert('Unable to retrieve location.')
            );
        } else {
            alert('Geolocation not supported');
        }
    };

    return (
        <div style={{ color:'gray',textAlign: 'center', marginTop: '50px',fontFamily: "cursive",fontStyle: "italic"}}>
            <h1>🚨 Emergency Alert System 🚨</h1>
            <button 
                onClick={sendEmergencySMS}
                style={{
                    backgroundColor: '#ff4c4c', color: 'white', fontSize: '1.2rem',fontFamily: "cursive",fontStyle: "italic",
                    padding: '15px 30px', border: 'none', borderRadius: '8px',
                    cursor: 'pointer', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
                    transition: '0.3s ease'
                }}
            >
                👉 Click to Trigger Emergency SMS 👈
            </button>
        </div>
    );
}

export default Emergency;
