import { getGeminiClient } from "../lib/gemini";

export async function generateArticleImage(prompt: string): Promise<string | null> {
  const gemini = getGeminiClient();
  if (!gemini) {
    console.warn('Gemini client not initialized. AI image generation will be disabled.');
    return null; // Return null if the client isn't available
  }

  try {
    const response = await gemini.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString: string = part.inlineData.data;
          return `data:image/png;base64,${base64EncodeString}`;
        }
      }
    }
    console.error("No image generated from Gemini API");
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null; // Return null on error instead of throwing
  }
}
