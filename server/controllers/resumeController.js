const fs = require("fs");
const pdfParse = require("pdf-parse");
const Resume = require("../models/Resume");


const uploadResume = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                message: "Please upload a PDF"
            });

        }

const dataBuffer = fs.readFileSync(req.file.path);
const pdf = await pdfParse(dataBuffer);
const savedResume = await Resume.create({

    user: req.user,

    fileName: req.file.originalname,

    extractedText: pdf.text

});

res.json({

    message: "Resume Uploaded Successfully",

    resume: savedResume

});

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            message:"Upload Failed"

        });

    }

};

const getMyResumes = async (req, res) => {

    try {

        const resumes = await Resume.find({
            user: req.user
        }).sort({
            createdAt: -1
        });

        res.json(resumes);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const deleteResume = async (req, res) => {

    try {

        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        await Resume.findByIdAndDelete(req.params.id);

        res.json({
            message: "Resume deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getResumeById = async (req, res) => {

    try {

        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user
        });

        if (!resume) {

            return res.status(404).json({
                message: "Resume not found"
            });

        }

        res.json(resume);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const analyzeResumeAI = async (req, res) => {

    try {

        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        res.json({
            message: "Resume found",
            extractedText: resume.extractedText
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getAllResumes = async (req, res) => {

    try {

        const resumes = await Resume.find({
            user: req.user
        }).sort({ createdAt: -1 });

        res.json(resumes);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



module.exports = {
    uploadResume,
    getMyResumes,
    deleteResume,
    getResumeById,
    analyzeResumeAI,
    getAllResumes
};