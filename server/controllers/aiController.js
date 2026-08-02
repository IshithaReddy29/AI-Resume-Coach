const Resume = require("../models/Resume");
const analyzeResume = require("../utils/gemini");

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

        const prompt = `
You are an ATS Resume Analyzer.

Analyze this resume.

Return ONLY valid JSON.

{
  "atsScore": number,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": []
}

Resume:

${resume.extractedText}
`;

        const analysis = await analyzeResume(prompt);

        const parsedResult = JSON.parse(
            analysis
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim()
        );

        resume.atsScore = parsedResult.atsScore;
        resume.strengths = parsedResult.strengths;
        resume.weaknesses = parsedResult.weaknesses;
        resume.missingSkills = parsedResult.missingSkills;
        resume.suggestions = parsedResult.suggestions;

        await resume.save();

        return res.json(resume);

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: error.message
        });

    }

};

const getLatestAnalysis = async (req, res) => {

    try {

        const resume = await Resume.findOne({
            user: req.user
        }).sort({ createdAt: -1 });

        if (!resume) {
            return res.status(404).json({
                message: "No Resume Found"
            });
        }

        return res.json(resume);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    analyzeResumeAI,
    getLatestAnalysis
};