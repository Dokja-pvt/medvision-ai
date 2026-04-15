import { GoogleGenerativeAI } from '@google/generative-ai';

// Safely pulling your real key from the .env file and trimming it
const apiKey = import.meta.env.VITE_GEMINI_API_KEY ? import.meta.env.VITE_GEMINI_API_KEY.trim() : '';
const genAI = new GoogleGenerativeAI(apiKey);

export const generatePharmaResponse = async (userMessage) => {
  try {
    if (!apiKey) throw new Error("API Key is missing or undefined.");
    
    // We are now using the actual model provisioned to your key!
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash", 
        systemInstruction: "You are Medvision AI, a highly professional clinical pharmacy assistant. Provide accurate, structured information about medications, dosages, and interactions. Always conclude with: '*Disclaimer: I am an AI, not a doctor. Please consult a healthcare professional before making medical decisions.*'"
    });

    const result = await model.generateContent(userMessage);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error Details:", error);
    throw error;
  }
};

export const analyzeMedicationImage = async (base64Image, mimeType = "image/jpeg") => {
  try {
    if (!apiKey) throw new Error("API Key is missing or undefined.");
    
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash", 
    });

    const prompt = `You are Medvision AI. Analyze this image of a medication label, bottle, or prescription. Provide a structured, easy-to-read Markdown report containing exactly these sections: **Medication Name**, **Composition / Active Ingredients**, **Primary Uses**, **Usual Dosage Guidelines**, and **Important Warnings**. Conclude with your standard medical disclaimer.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: mimeType
        }
      }
    ]);
    
    return result.response.text();
  } catch (error) {
    console.error("Vision Analysis Error Details:", error);
    throw error;
  }
};