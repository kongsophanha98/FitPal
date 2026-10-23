
import type { Ingredient, Recipe, RecipeIngredient } from '../types'

export const ingredients: Ingredient[] = [
  { id: 1, name: 'Chicken', caloriesPer100g: 165 },
  { id: 2, name: 'Rice', caloriesPer100g: 130 },
  { id: 3, name: 'Avocado', caloriesPer100g: 160 },
  { id: 4, name: 'Tomato', caloriesPer100g: 18 },
  { id: 5, name: 'Broccoli', caloriesPer100g: 34 },
  { id: 6, name: 'Salmon', caloriesPer100g: 208 },
]

export const recipes: Recipe[] = [
  {
    id: 1,
    title: 'Chicken Avocado Bowl',
    steps: [
      'Cook the rice according to its instructions.',
      'Cook the chicken thoroughly.',
      'Slice the avocado and serve everything in a bowl.',
    ],
    servings: 2,
    isOfficial: true,
  },
  {
    id: 2,
    title: 'Tomato Rice Bowl',
    steps: [
      'Cook the rice.',
      'Wash and chop the tomatoes.',
      'Combine and serve.',
    ],
    servings: 1,
    isOfficial: false,
  },
  {
    id: 3,
    title: 'Salmon and Broccoli',
    steps: [
      'Prepare the broccoli.',
      'Cook the salmon thoroughly.',
      'Serve with the broccoli.',
    ],
    servings: 2,
    isOfficial: true,
  },
]

export const recipeIngredients: RecipeIngredient[] = [
  { recipeId: 1, ingredientId: 1, amountInGrams: 200 },
  { recipeId: 1, ingredientId: 2, amountInGrams: 150 },
  { recipeId: 1, ingredientId: 3, amountInGrams: 100 },
  { recipeId: 2, ingredientId: 2, amountInGrams: 180 },
  { recipeId: 2, ingredientId: 4, amountInGrams: 150 },
  { recipeId: 3, ingredientId: 6, amountInGrams: 200 },
  { recipeId: 3, ingredientId: 5, amountInGrams: 150 },
]
