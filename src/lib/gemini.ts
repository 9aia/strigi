import { GoogleGenerativeAI } from "@google/generative-ai"
import { config, DEFAULT_CONFIG } from "../config"

let genAI: GoogleGenerativeAI

export function getGemini(systemInstruction?: string, modelName?: string) {
  if (!genAI) {
    const GEMINI_API_KEY = config.geminiApiKey || Bun.env.S_GEMINI_API_KEY

    if (!GEMINI_API_KEY)
      throw new Error("Gemini API key not set")

    genAI = new GoogleGenerativeAI(GEMINI_API_KEY!)
  }

  const model = genAI.getGenerativeModel({
    model: modelName || config.model || DEFAULT_CONFIG.model!,
    systemInstruction,
  })

  return model
}

export async function getAvailableModels() {
  const GEMINI_API_KEY = config.geminiApiKey || Bun.env.S_GEMINI_API_KEY
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: any = await response.json();
  
  // Filter for models that support 'generateContent'
  const contentModels = data.models.filter((m: any) => {
    return m.supportedGenerationMethods.includes('generateContent') || m.supportedGenerationMethods.includes('batchGenerateContent')
  });

  return contentModels.map((m: any) => ({
    name: m.name.replace("models/", ""),
    displayName: m.displayName,
  }));
}
