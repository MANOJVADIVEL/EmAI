import axios from "axios";
import { useState } from "react";
import "./Tabfind.css";
 
function Tabfind() {
    const [medicineName, setMedicineName] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
 
    const searchMedicine = async () => {
        if (!medicineName.trim()) {
            alert("Please enter a medicine name!");
            return;
        }
        try {
            const response = await axios.get(`http://localhost:9000/search?medicine=${medicineName}`);
            setResults(response.data);
            setError("");
        } catch (err) {
            setError("Error fetching data. Please try again later.");
            console.error(err);
        }
    };
 
    // Voice recognition function
    const startVoiceRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Your browser does not support speech recognition.");
            return;
        }
 
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.start();
 
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setMedicineName(transcript);
        };
 
        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            alert("Voice recognition failed. Try again.");
        };
    };
 
    return (
        <div className="contain">
        <marquee class="id"direction="left"loop=""scrollamount="10">Find the Medicine you need.........</marquee>
            <h1 className="first">Medicine Stock Search</h1>
            <div className="search-box">
                <input
                    type="text"
                    value={medicineName}
                    onChange={(e) => setMedicineName(e.target.value)}
                    placeholder="Enter medicine name..."
                />
                <button onClick={startVoiceRecognition} title="Click to Speak">🎤</button>
            </div>
            <button onClick={searchMedicine}>Search</button>
 
            {error && <p style={{ color: "red" }}>{error}</p>}
 
            {results.length > 0 && (
                <table border="1" className="tablesd">
                    <thead>
                        <tr>
                            <th className="header">Medicine Name</th>
                            <th className="header">Shop Name</th>
                            <th className="header">Location</th>
                            <th className="header">Person Name</th>
                            <th className="header">Mobile No</th>
                            <th className="header">MFG Date</th>
                            <th className="header">Expired Date</th>
                            <th className="header">Stock Count</th>
                            <th className="header">Status Check</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((item, index) => (
                            <tr key={index}>
                                <td className="data">{item.medicine}</td>
                                <td className="data">{item.shop}</td>
                                <td className="data">{item.location}</td>
                                <td className="data">{item.person}</td>
                                <td className="data">{item.mobile}</td>
                                <td className="data">{item.MFG_Date}</td>
                                <td className="data">{item.Expired_Date}</td>
                                <td className="data">{item.stock_Count}</td>
                                <td className="data">{item.status_Check}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
 
export default Tabfind;