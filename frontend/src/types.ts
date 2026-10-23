
export interface Ingredient {
  id: number
  name: string
  caloriesPer100g: number
}

export interface Recipe {
  id: number
  title: string
  steps: string[]
  servings: number
  isOfficial: boolean
}

export interface RecipeIngredient {
  recipeId: number
  ingredientId: number
  amountInGrams: number
}
