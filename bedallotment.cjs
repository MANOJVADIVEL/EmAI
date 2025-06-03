const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Sample Data - Floors and Beds
let floors = [
  {
    id: 1,
    name: "First Floor",
    totalBeds: 10,
    available: 10,
    beds: Array.from({ length: 10 }, (_, i) => ({
      bedNumber: i + 1,
      occupied: false,
      patientName: "",
      cause: "",
      dischargeDate: "",
    })),
  },
  {
    id: 2,
    name: "Second Floor",
    totalBeds: 10,
    available: 10,
    beds: Array.from({ length: 10 }, (_, i) => ({
      bedNumber: i + 1,
      occupied: false,
      patientName: "",
      cause: "",
      dischargeDate: "",
    })),
  },
  {
    id: 3,
    name: "Third Floor",
    totalBeds: 10,
    available: 10,
    beds: Array.from({ length: 10 }, (_, i) => ({
      bedNumber: i + 1,
      occupied: false,
      patientName: "",
      cause: "",
      dischargeDate: "",
    })),
  },
];

// 📌 Get All Floors with Bed Details
app.get("/beds", (req, res) => {
  res.json(floors);
});

// 📌 Allot a Bed to a Patient
app.post("/allot-bed", (req, res) => {
  const { patientName, floorName, cause, dischargeDate } = req.body;

  const floor = floors.find((f) => f.name === floorName);
  if (!floor) return res.status(404).json({ message: "Floor not found" });

  const availableBed = floor.beds.find((bed) => !bed.occupied);
  if (!availableBed) return res.status(400).json({ message: "No available beds" });

  availableBed.occupied = true;
  availableBed.patientName = patientName;
  availableBed.cause = cause;
  availableBed.dischargeDate = dischargeDate;
  floor.available--;

  res.json({ message: `Bed allotted to ${patientName}` });
});

// 📌 Discharge a Patient
app.post("/discharge-patient", (req, res) => {
  const { floorName, bedNumber } = req.body;

  const floor = floors.find((f) => f.name === floorName);
  if (!floor) return res.status(404).json({ message: "Floor not found" });

  const bed = floor.beds.find((b) => b.bedNumber === bedNumber);
  if (!bed || !bed.occupied) return res.status(400).json({ message: "Bed is already empty" });

  bed.occupied = false;
  bed.patientName = "";
  bed.cause = "";
  bed.dischargeDate = "";
  floor.available++;

  res.json({ message: `Patient discharged from bed ${bedNumber}` });
});

// 📌 Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});