import { GoogleGenAI, Type } from '@google/genai';
import { getGeminiPrompt } from '../constants';
import { AnalysisResultData, Language, SymptomData, UserInfo } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const parseBase64Image = (base64: string) => {
    const parts = base64.split(';base64,');
    const mimeType = parts[0].split(':')[1];
    const data = parts[1];
    return { mimeType, data };
};

export const analyzeSymptoms = async (
  language: Language,
  userInfo: UserInfo,
  symptomData: SymptomData
): Promise<AnalysisResultData> => {
  try {
    const hasImage = !!symptomData.imageBase64;
    const prompt = getGeminiPrompt(language, userInfo, symptomData.text, hasImage);
    
    const requestParts: ({ text: string } | { inlineData: { mimeType: string, data: string } })[] = [];

    if (symptomData.imageBase64) {
      const { mimeType, data } = parseBase64Image(symptomData.imageBase64);
      requestParts.push({
        inlineData: {
            mimeType,
            data
        }
      });
    }
    
    requestParts.push({ text: prompt });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: requestParts },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                assessment: { type: Type.STRING },
                suggestions: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                },
                isCritical: { type: Type.BOOLEAN },
                criticalityReason: { type: Type.STRING },
                disclaimer: { type: Type.STRING }
            }
        }
      }
    });

    const responseText = response.text.trim();
    const result: AnalysisResultData = JSON.parse(responseText);
    
    return result;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get analysis from AI: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the AI.");
  }
};