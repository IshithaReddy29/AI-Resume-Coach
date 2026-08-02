const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function analyzeResume(prompt) {

    const response = await ai.models.generateContent({

        model: "gemini-3.5-flash",

        contents: prompt

    });

    return response.text;

}

module.exports = analyzeResume;