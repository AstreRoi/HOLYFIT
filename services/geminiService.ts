import { GoogleGenAI } from "@google/genai";
import { DietPlan, WorkoutRoutine } from "../types";

// --- Mock Data (Fallback) ---
const MOCK_DIET_PLANS: Record<string, DietPlan> = {
  'Default': {
    title: "AI 연결 실패 - 기본 식단",
    description: "API 키를 확인하거나 네트워크 상태를 점검해주세요. 기본 밸런스 식단을 보여드립니다.",
    meals: [
      {
        name: "아침: 통밀 토스트와 에그",
        calories: 400,
        protein: "20g",
        carbs: "40g",
        fat: "15g",
        ingredients: ["통밀 식빵", "계란 2개", "사과"]
      },
      {
        name: "점심: 비빔밥",
        calories: 550,
        protein: "20g",
        carbs: "70g",
        fat: "15g",
        ingredients: ["현미밥", "나물", "고추장", "참기름"]
      },
      {
        name: "저녁: 두부 샐러드",
        calories: 350,
        protein: "15g",
        carbs: "20g",
        fat: "20g",
        ingredients: ["두부", "양상추", "오리엔탈 드레싱"]
      }
    ]
  }
};

const MOCK_WORKOUT_ROUTINES: Record<string, WorkoutRoutine> = {
  'Default': {
    title: "기본 전신 운동 (오프라인 모드)",
    difficulty: "Beginner",
    durationMinutes: 30,
    exercises: [
      {
        name: "스쿼트",
        sets: 3,
        reps: "15회",
        description: "기본적인 하체 운동입니다."
      },
      {
        name: "푸쉬업",
        sets: 3,
        reps: "10회",
        description: "상체 근력 강화 운동입니다."
      },
      {
        name: "플랭크",
        sets: 3,
        reps: "30초",
        description: "코어 강화 운동입니다."
      }
    ]
  }
};

// --- API Initialization ---
// The API key must be obtained exclusively from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- Helper to parse clean JSON ---
const parseJson = (text: string) => {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(text);
  } catch (e) {
    console.error("JSON Parse Error:", e);
    return null;
  }
};

export const generateDietPlan = async (goal: string, consumedCalories: number = 0): Promise<DietPlan> => {
  try {
    const prompt = `
      You are a professional nutritionist. Create a daily diet plan for a user with the goal: "${goal}".
      The user has already consumed ${consumedCalories} kcal today.
      
      Requirements:
      1. Calculate remaining calories needed based on a standard 2500kcal TDEE (or adjust for goal).
      2. Provide 3 meals (Breakfast, Lunch, Dinner).
      3. Return ONLY valid JSON matching this interface:
      {
        "title": "Short catchy title in Korean",
        "description": "2-3 sentences encouraging description in Korean including remaining calorie advice",
        "meals": [
          {
            "name": "Meal Name",
            "calories": number,
            "protein": "10g",
            "carbs": "20g",
            "fat": "5g",
            "ingredients": ["ing1", "ing2", "ing3"]
          }
        ]
      }
      Respond ONLY in JSON. Use Korean language.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const parsed = parseJson(response.text);
    if (parsed) return parsed;
    throw new Error("Failed to parse diet plan");

  } catch (error) {
    console.error("AI Generation Error:", error);
    return MOCK_DIET_PLANS['Default'];
  }
};

export const generateWorkoutRoutine = async (level: string): Promise<WorkoutRoutine> => {
  try {
    const prompt = `
      You are a fitness coach. Create a workout routine for a user with difficulty level: "${level}".
      
      Requirements:
      1. Include 4-5 exercises.
      2. Return ONLY valid JSON matching this interface:
      {
        "title": "Motivating Routine Title in Korean",
        "difficulty": "Beginner" | "Intermediate" | "Advanced",
        "durationMinutes": number,
        "exercises": [
          {
            "name": "Exercise Name",
            "sets": number,
            "reps": "e.g., 12 reps or 30 sec",
            "description": "Short instruction in Korean"
          }
        ]
      }
      Respond ONLY in JSON. Use Korean language.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const parsed = parseJson(response.text);
    if (parsed) return parsed;
    throw new Error("Failed to parse workout routine");

  } catch (error) {
    console.error("AI Generation Error:", error);
    return MOCK_WORKOUT_ROUTINES['Default'];
  }
};