export enum ViewState {
  HOME = 'HOME',
  DIET = 'DIET',
  WORKOUT = 'WORKOUT',
  SUBSCRIPTION = 'SUBSCRIPTION',
}

export interface Meal {
  name: string;
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  ingredients: string[];
}

export interface DietPlan {
  title: string;
  description: string;
  meals: Meal[];
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  description: string;
}

export interface WorkoutRoutine {
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  exercises: Exercise[];
}

export interface SubscriptionTier {
  id: string;
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}