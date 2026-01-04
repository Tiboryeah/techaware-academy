const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();

const testGemini = async (modelName) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY.trim());
    const model = genAI.getGenerativeModel({ model: modelName });
    try {
        console.log(`Testing ${modelName}...`);
        const result = await model.generateContent("Hola");
        console.log(`SUCCESS with ${modelName}:`, result.response.text().substring(0, 20));
    } catch (e) {
        console.error(`FAILED with ${modelName}:`, e.message);
    }
};

const run = async () => {
    await testGemini("gemini-2.0-flash-lite");
    await testGemini("gemini-flash-lite-latest");
};

run();
