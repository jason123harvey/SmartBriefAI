import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const SUMMARIZATION_PROMPT = `
You are an expert article summarization and information extraction AI.

Analyze the complete article provided by the user.

Return ONLY valid JSON with exactly these fields:

{
  "title": "string",
  "shortSummary": "string",
  "detailedSummary": "string",
  "keywords": ["string"],
  "mainTopics": ["string"],
  "importantPoints": ["string"],
  "keyFacts": ["string"],
  "simplifiedVersion": "string",
  "conclusion": "string"
}

Requirements:

- shortSummary: 3-5 sentences.
- detailedSummary: 1-2 paragraphs.
- keywords: 5-15 important keywords.
- mainTopics: 3-7 major topics.
- importantPoints: 5-10 important points.
- keyFacts: important facts, names, dates and numbers.
- simplifiedVersion: explain the article using simple language.
- conclusion: explain the overall message.
- Do not invent information.
- Preserve important facts and technical terms.
- Remove unnecessary repetition.
- Return ONLY valid JSON.
`;

export async function summarizeArticle(articleText) {

  if (!articleText || articleText.trim().length === 0) {
    throw new Error("Article text cannot be empty");
  }

  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing from .env");
  }

  try {

    const prompt = `
${SUMMARIZATION_PROMPT}

ARTICLE TO SUMMARIZE:

${articleText}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;

    console.log("Gemini response received successfully");

    const parsedResponse = JSON.parse(text);

    return {
      success: true,
      data: parsedResponse
    };

  } catch (error) {

    console.error("Gemini API Error:", error.message);

    throw error;
  }
}