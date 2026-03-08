export type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface RecipeStep {
  id: string;
  recipeId: string;
  order: number;
  instruction: string;
  instructionHe: string;
  durationMin?: number;
}

export interface Recipe {
  id: string;
  title: string;
  titleHe: string;
  description?: string;
  descriptionHe?: string;
  mealType: MealType;
  difficulty: Difficulty;
  prepMinutes: number;
  toddlerFriendly: boolean;
  ingredients: string[];
  ingredientsHe: string[];
  steps: RecipeStep[];
  isFavorite: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RecipeFilters {
  mealType?: MealType;
  difficulty?: Difficulty;
  toddlerFriendly?: boolean;
  maxPrepMinutes?: number;
  favoritesOnly?: boolean;
}

export interface CreateRecipeDto {
  title: string;
  titleHe: string;
  description?: string;
  descriptionHe?: string;
  mealType: MealType;
  difficulty: Difficulty;
  prepMinutes: number;
  toddlerFriendly?: boolean;
  ingredients: string[];
  ingredientsHe: string[];
  tags?: string[];
}
