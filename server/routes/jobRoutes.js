const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const { analyzeJob } = require("../controllers/jobController");

router.post("/match/:id", auth, analyzeJob);

module.exports = router;