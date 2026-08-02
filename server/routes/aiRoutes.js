const express = require("express");
const controller = require("../controllers/aiController");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    analyzeResumeAI,
    getLatestAnalysis
} = controller;

router.post("/analyze/:id",auth,analyzeResumeAI);
router.get("/latest", auth, getLatestAnalysis);

module.exports = router;