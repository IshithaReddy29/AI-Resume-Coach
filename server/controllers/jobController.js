const Resume = require("../models/Resume");
const analyzeResume = require("../utils/gemini");

const analyzeJob = async (req,res)=>{

try{

    const {jobDescription}=req.body;

    const resume=await Resume.findOne({

        _id:req.params.id,
        user:req.user

    });

    if(!resume){

        return res.status(404).json({

            message:"Resume not found"

        });

    }

    const prompt=`

You are an ATS Job Matcher.

Compare this resume with the following Job Description.

Return ONLY valid JSON.

{
"matchScore":number,
"missingSkills":[],
"recommendations":[]
}

Resume:

${resume.extractedText}

Job Description:

${jobDescription}

`;

    const result=await analyzeResume(prompt);

    const data=JSON.parse(result);

    resume.jobMatchScore=data.matchScore;

    resume.jobMissingSkills=data.missingSkills;

    resume.jobRecommendations=data.recommendations;

    await resume.save();

    res.json(data);

}

catch(error){

    res.status(500).json({

        message:error.message

    });

}

};

module.exports={analyzeJob};