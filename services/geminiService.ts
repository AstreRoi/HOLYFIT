import { GoogleGenAI, Type, Schema } from "@google/genai";
import { DietPlan, WorkoutRoutine } from "../types";

// API 키가 환경변수에 없을 경우를 대비해 빈 문자열로 초기화 (앱 크래시 방지)
// 주의: GitHub Actions나 배포 설정에서 VITE_API_KEY 환경 변수를 반드시 설정해야 AI 기능이 작동합니다.
const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

// Schema for Diet Generation
const dietSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "A catchy title for the daily diet plan in Korean" },
    description: { type: Type.STRING, description: "Brief overview of nutritional goals in Korean" },
    meals: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Meal name in Korean" },
          calories: { type: Type.NUMBER },
          protein: { type: Type.STRING },
          carbs: { type: Type.STRING },
          fat: { type: Type.STRING },
          ingredients: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING, description: "Ingredient in Korean" } 
          }
        },
        required: ["name", "calories", "protein", "carbs", "fat", "ingredients"]
      }
    }
  },
  required: ["title", "description", "meals"]
};

// Schema for Workout Generation
const workoutSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Name of the workout routine in Korean" },
    difficulty: { type: Type.STRING, enum: ["Beginner", "Intermediate", "Advanced"] },
    durationMinutes: { type: Type.NUMBER },
    exercises: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Exercise name in Korean" },
          sets: { type: Type.NUMBER },
          reps: { type: Type.STRING, description: "Reps description in Korean (e.g., '12회')" },
          description: { type: Type.STRING, description: "Short instruction in Korean" }
        },
        required: ["name", "sets", "reps", "description"]
      }
    }
  },
  required: ["title", "difficulty", "durationMinutes", "exercises"]
};

export const generateDietPlan = async (goal: string): Promise<DietPlan | null> => {
  if (!apiKey) {
    console.warn("Gemini API Key is missing. Please check your environment variables.");
    return null;
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a 1-day healthy diet plan for a user with the goal: ${goal}. Focus on balanced nutrition. Respond strictly in Korean language.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: dietSchema,
      },
    });

    const jsonText = response.text;
    if (!jsonText) return null;
    return JSON.parse(jsonText) as DietPlan;
  } catch (error) {
    console.error("Error generating diet plan:", error);
    return null;
  }
};

export const generateWorkoutRoutine = async (level: string): Promise<WorkoutRoutine | null> => {
  if (!apiKey) {
    console.warn("Gemini API Key is missing. Please check your environment variables.");
    return null;
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Create a comprehensive gym workout routine for a ${level} level user. Respond strictly in Korean language.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: workoutSchema,
      },
    });

    const jsonText = response.text;
    if (!jsonText) return null;
    return JSON.parse(jsonText) as WorkoutRoutine;
  } catch (error) {
    console.error("Error generating workout routine:", error);
    return null;
  }
};