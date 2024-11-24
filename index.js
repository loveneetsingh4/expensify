const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./db");
const User = require("./models/User");
const trackerRoutes = require("./routes/trackRoutes");
const cropTrackeRoutes = require("./routes/cropTracker");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use("/api/trackers", trackerRoutes);
app.use("/api/crop", cropTrackeRoutes);

// healthcheck 


app.get("/healthCheck",(req,res)=>{
  res.send(`health and all working fine`)
})

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the MongoDB Node.js app!");
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new user
app.post("/users", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
