import React, { useState } from "react";
import { Search, AlertCircle, ThumbsUp } from "lucide-react";
import "./MedicineSuggestions.css"; // Import the CSS

const predefinedSolutions = {
  Headache: {
    name: "Paracetamol",
    dosage: "500mg",
    frequency: "Every 6 hours",
    confidence: 95,
    advice: "Stay hydrated and rest in a quiet, dark room.",
  },
  Fever: {
    name: "Ibuprofen",
    dosage: "400mg",
    frequency: "Every 8 hours",
    confidence: 90,
    advice: "Drink plenty of fluids and monitor your temperature.",
  },
  Cough: {
    name: "Dextromethorphan",
    dosage: "10ml syrup",
    frequency: "Every 6 hours",
    confidence: 88,
    advice: "Use a humidifier and avoid cold drinks.",
  },
  "Sore Throat": {
    name: "Lozenges",
    dosage: "1 lozenge",
    frequency: "Every 4 hours",
    confidence: 87,
    advice: "Gargle with warm salt water and drink warm tea.",
  },
  "Body Aches": {
    name: "Acetaminophen",
    dosage: "500mg",
    frequency: "Every 6 hours",
    confidence: 92,
    advice: "Take warm baths and gently stretch your muscles.",
  },
  Nausea: {
    name: "Ondansetron",
    dosage: "4mg",
    frequency: "Every 8 hours",
    confidence: 85,
    advice: "Eat small, bland meals and avoid strong smells.",
  },
};

const MedicineSuggestions = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleSymptomToggle = (symptom) => {
    const updatedSymptoms = selectedSymptoms.includes(symptom)
      ? selectedSymptoms.filter((s) => s !== symptom)
      : [...selectedSymptoms, symptom];
    setSelectedSymptoms(updatedSymptoms);
  };

  const getSuggestions = () => {
    const filteredSuggestions = selectedSymptoms.map(
      (symptom) => predefinedSolutions[symptom]
    );
    setSuggestions(filteredSuggestions);
  };

  return (
    <div className="containerss">
      <h2 className="heading">AI Medicine Suggestions</h2>

      <div className="content">
        <div className="form-section">
          <div className="alert-box">
            <AlertCircle className="icon-alert" />
            <p className="alert-text">
              This AI-powered tool suggests common medicines for minor illnesses based on symptoms.
              Always consult a healthcare professional before taking any medication.
            </p>
          </div>

          <div className="symptom-select">
            <label className="label">Select Your Symptoms</label>
            <div className="checkbox-grid">
              {Object.keys(predefinedSolutions).map((symptom) => (
                <label key={symptom} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={selectedSymptoms.includes(symptom)}
                    onChange={() => handleSymptomToggle(symptom)}
                  />
                  {symptom}
                </label>
              ))}
            </div>
          </div>

          <button
            className="submit-btn"
            onClick={getSuggestions}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1e40af")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
          >
            <Search className="icon" />
            Get AI Suggestions
          </button>
        </div>

        <div className="suggestion-section">
          <div className="suggestion-box">
            <h3 className="suggestion-heading">AI-Suggested Solutions</h3>

            {suggestions.length > 0 ? (
              <div className="suggestion-list">
                {suggestions.map((medicine, index) => (
                  <div key={index} className="medicine-card">
                    <div className="medicine-header">
                      <span className="medicine-name">{medicine.name}</span>
                      <div className="confidence">
                        <ThumbsUp className="icon-small" />
                        {medicine.confidence}% match
                      </div>
                    </div>
                    <div className="medicine-details">
                      <p>Dosage: {medicine.dosage}</p>
                      <p>Frequency: {medicine.frequency}</p>
                      <p className="advice">Advice: {medicine.advice}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="placeholder-text">Select symptoms to get AI recommendations.</p>
            )}

            <div className="notes">
              <p className="note-heading">Important Notes:</p>
              <ul className="note-list">
                <li>These are AI-generated suggestions based on common symptoms.</li>
                <li>Consult a healthcare professional before taking any medication.</li>
                <li>If symptoms persist, seek immediate medical attention.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineSuggestions;
