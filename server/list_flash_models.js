const dotenv = require('dotenv');
dotenv.config();

const testModels = async () => {
    const apiKey = process.env.GEMINI_API_KEY.trim();
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const flashModels = data.models
            .filter(m => m.name.includes('flash'))
            .map(m => m.name);
        console.log("AVAILABLE FLASH MODELS:", flashModels);
    } catch (e) {
        console.error("ERROR:", e);
    }
};

testModels();
