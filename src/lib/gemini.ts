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
