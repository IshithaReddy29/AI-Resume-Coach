
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
console.log(authRoutes);
console.log(typeof authRoutes);
const resumeRoutes = require("./routes/resumeRoutes");
const aiRoutes = require("./routes/aiRoutes");
const jobRoutes = require("./routes/jobRoutes");



connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/job", jobRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("AI Resume Coach Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});