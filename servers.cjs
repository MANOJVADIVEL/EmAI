const express = require("express");
const twilio = require("twilio");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

function sendSMS(req, res) {
    const { latitude, longitude } = req.body;
    const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
    client.messages
        .create({
            body: `I am Kelsy, Emergency! Please respond me immediately.This is My Current Location.\nLocation: https://www.google.com/maps?q=${latitude},${longitude}`,
            from: '+18284758502',
            to: process.env.PHONE_NUMBER,
        })
        .then((message) => res.status(200).json({ success: true, message: 'Message sent successfully!' }))
        .catch((err) => res.status(500).json({ success: false, error: 'Failed to send message.' }));
}

app.post('/send-emergency-sms', sendSMS);

app.listen(8000, () => console.log('Server running on port 8000'));
