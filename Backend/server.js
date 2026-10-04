const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors()); // Allows your React app to talk to the Node server
app.use(express.json()); // Parses incoming JSON requests

// Mock Database / Logging for Requests
const dispatchLogs = [];

// API Endpoint to Handle Ambulance Requests
app.post("/api/emergency", (req, res) => {
  const { name, phone, location } = req.body;

  if (!name || !phone || !location) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // In a real-world app, you would save this to MongoDB/PostgreSQL
  // and trigger an SMS/Email to the dispatch center using Twilio/Nodemailer.
  const newRequest = {
    id: Date.now(),
    name,
    phone,
    location,
    timestamp: new Date(),
    status: "DISPATCHED",
  };

  dispatchLogs.push(newRequest);
  console.log("🚨 NEW AMBULANCE REQUEST RECEIVED 🚨");
  console.table([newRequest]);

  // Send success response back to React
  res.status(200).json({
    message: "Request received successfully. Ambulance dispatched.",
    dispatchId: newRequest.id,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚑 Navi Heart Dispatch Server running on port ${PORT}`);
});
