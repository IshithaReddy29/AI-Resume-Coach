const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    uploadResume,
    getMyResumes,
    getResumeById,
    deleteResume,
    analyzeResumeAI,
    getAllResumes
} = require("../controllers/resumeController");

router.post(
    "/upload",
    auth,
    upload.single("resume"),
    uploadResume
);
router.get("/", auth, getAllResumes);
router.delete("/:id", auth, deleteResume);
router.get(
    "/",
    auth,
    getMyResumes
);
router.get(
    "/:id",
    auth,
    getResumeById
);
router.delete(
    "/:id",
    auth,
    deleteResume
);

router.post(
    "/analyze/:id",
    auth,
    analyzeResumeAI
);

module.exports =router;