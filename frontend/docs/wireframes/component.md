# FitPal — Component Documentation

## 1. Project Overview

FitPal is a recipe discovery and calorie-tracking application. The current frontend prototype uses Vue 3, TypeScript, and hardcoded sample data.

## 2. Component Tree

```text
App.vue
├── Header
├── RecipeDiscovery
│   ├── IngredientSearch
│   └── RecipeCard (repeated)
├── RecipeDetails
└── AboutSection
```

Note: Header, RecipeDiscovery, RecipeDetails, and AboutSection are conceptual sections currently implemented inside `App.vue`, not separate Vue components.

The reusable `RecipeCard.vue` is a separate component.

## 3. Component Details

### App.vue

**Responsibility:** Main application view, recipe filtering, calorie estimation, and recipe detail selection.

**State owned:**
- `availableIngredients`: ingredient search input.
- `selectedRecipeId`: ID of the recipe selected for viewing, or `null`.

**Computed state:**
- `displayedRecipes`: recipes filtered by the entered ingredients.

**Events handled:**
- Receives the `view` event from `RecipeCard.vue` and updates `selectedRecipeId`.

**Data sources:**
- Imports `ingredients`, `recipes`, and `recipeIngredients` from `src/data/recipes.ts`.

### RecipeCard.vue

**Responsibility:** Displays an individual recipe card.

**Props:**
- `recipe`: recipe information.
- `calories`: estimated calories per serving.
- `ingredientNames`: names of the recipe's ingredients.

**Emitted events:**
- `view`: emits the selected recipe's ID when the user clicks the View recipe button.

**State ownership:** Does not own application-level state. It receives data through props and emits events to its parent.

### recipes.ts

**Responsibility:** Stores hardcoded sample data for the prototype.

**Exports:**
- `ingredients`
- `recipes`
- `recipeIngredients`

### types.ts

**Responsibility:** Defines TypeScript interfaces for the core entities.

**Interfaces:**
- `Ingredient`
- `Recipe`
- `RecipeIngredient`

## 4. Props Down, Events Up

The parent component, `App.vue`, passes recipe information down to `RecipeCard.vue` using props. When a user clicks View recipe, the card emits a `view` event containing the recipe ID. The parent handles the event and updates its own state to display the selected recipe details.

This keeps the card reusable and avoids letting a child component directly control the parent's state.

## 5. Current Limitations

- Recipe data is hardcoded; there is no database yet.
- Ingredient matching is a basic text search, not a ranking algorithm.
- Calorie estimates use sample ingredient values and quantities.
- User accounts, meal logging, and personalized calorie goals are not implemented yet.
