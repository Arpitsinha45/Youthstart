import { GoogleGenAI } from "@google/genai";

let geminiClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI | null {
  if (geminiClient) {
    return geminiClient;
  }

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.warn("VITE_GEMINI_API_KEY is not set. AI features will be unavailable.");
    return null;
  }

  try {
    geminiClient = new GoogleGenAI({ apiKey });
    return geminiClient;
  } catch (error) {
    console.error("Failed to initialize Gemini client:", error);
    return null;
  }
}
