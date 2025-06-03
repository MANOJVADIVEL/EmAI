const express = require("express");
const cors = require("cors");
const xlsx = require("xlsx");
const path = require("path");

const app = express();
const PORT = 9000;

app.use(cors());

const workbook = xlsx.readFile(path.join(__dirname, "UserP.xlsx"));
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet, { raw: true });

function formatExcelDate(value) {
    if (!value || isNaN(value)) return "N/A";
    return xlsx.SSF.format("yyyy-mm-dd", value);
}

app.get("/search", (req, res) => {
    const medicineName = req.query.medicine ? req.query.medicine.toLowerCase() : "";
    const results = data.filter(item =>
        item["Medicine Name"] && item["Medicine Name"].toLowerCase() === medicineName
    );

    res.json(results.map(item => ({
        medicine: item["Medicine Name"] || "N/A",
        shop: item["Shop Name"] || "N/A",
        location: item["Location"] || "N/A",
        person: item["Person Name"] || "N/A",
        mobile: item["Mobile Number"] || "N/A",
        MFG_Date: formatExcelDate(item["MFG Date"]),
        Expired_Date: formatExcelDate(item["Expired Date"]),
        stock_Count: item["Stock Count"] || "N/A",
        status_Check: item["Status check"] || "N/A"
    })));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
