const express = require("express");
const cors = require("cors");
// const fetch = require("node-fetch"); // built-in in Node 18+
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/internships", async (req, res) => {
  try {
    const response = await fetch("https://internshala.com/hiring/search");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from Internshala:", error);
    res.status(500).json({ error: "Failed to fetch internships" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
