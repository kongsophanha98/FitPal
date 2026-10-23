
<script setup lang="ts">
import { computed, ref } from 'vue'
import RecipeCard from './components/RecipeCard.vue'
import { ingredients, recipes, recipeIngredients } from './data/recipes'

const availableIngredients = ref('')
const selectedRecipeId = ref<number | null>(null)

const displayedRecipes = computed(() => {
  const search = availableIngredients.value
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)

  return recipes.filter((recipe) => {
    if (search.length === 0) return true

    const recipeIngredientNames = recipeIngredients
      .filter((item) => item.recipeId === recipe.id)
      .map((item) =>
        ingredients.find((ingredient) => ingredient.id === item.ingredientId),
      )
      .filter((item) => item !== undefined)
      .map((item) => item.name.toLowerCase())

    return search.some((term) =>
      recipeIngredientNames.some((name) => name.includes(term)),
    )
  })
})

function getIngredientNames(recipeId: number) {
  return recipeIngredients
    .filter((item) => item.recipeId === recipeId)
    .map((item) =>
      ingredients.find((ingredient) => ingredient.id === item.ingredientId),
    )
    .filter((item) => item !== undefined)
    .map((item) => item.name)
}

function getCalories(recipeId: number) {
  const total = recipeIngredients
    .filter((item) => item.recipeId === recipeId)
    .reduce((sum, item) => {
      const ingredient = ingredients.find(
        (entry) => entry.id === item.ingredientId,
      )

      return sum + (ingredient ? ingredient.caloriesPer100g * item.amountInGrams / 100 : 0)
    }, 0)

  const recipe = recipes.find((item) => item.id === recipeId)
  return Math.round(total / (recipe?.servings || 1))
}
</script>

<template>
  <div class="app">
    <header>
      <a class="logo" href="#">🥑 FitPal</a>
      <nav>
        <a href="#recipes">Discover Recipes</a>
        <a href="#about">About FitPal</a>
      </nav>
    </header>

    <main>
      <section class="hero">
        <p class="eyebrow">YOUR FOOD, YOUR GOALS</p>
        <h1>Find recipes that<br /><span>fit your life.</span></h1>
        <p class="subtitle">
          Discover meals using ingredients you already have.
        </p>

        <input
          v-model="availableIngredients"
          class="search"
          placeholder="Try chicken, rice, or tomato..."
          aria-label="Search available ingredients"
        />
        <p class="hint">Separate ingredients with commas.</p>
      </section>

      <section id="recipes" class="recipes">
        <div class="section-heading">
          <div>
            <p class="eyebrow">MADE FOR YOU</p>
            <h2>Explore recipes</h2>
          </div>
          <span>{{ displayedRecipes.length }} recipes</span>
        </div>

        <div v-if="displayedRecipes.length" class="recipe-grid">
          <RecipeCard
            v-for="recipe in displayedRecipes"
            :key="recipe.id"
            :recipe="recipe"
            :calories="getCalories(recipe.id)"
            :ingredient-names="getIngredientNames(recipe.id)"
            @view="selectedRecipeId = $event"
          />
        </div>

        <p v-else class="empty">
          No matching recipes. Try another ingredient!
        </p>

        <section v-if="selectedRecipeId !== null" class="recipe-details">
          <button class="close" @click="selectedRecipeId = null">Close ×</button>
          <template v-for="recipe in recipes.filter((item) => item.id === selectedRecipeId)" :key="recipe.id">
            <p class="eyebrow">RECIPE DETAILS</p>
            <h2>{{ recipe.title }}</h2>
            <p>Estimated calories per serving: {{ getCalories(recipe.id) }} kcal</p>
            <h3>Ingredients</h3>
            <ul>
              <li v-for="name in getIngredientNames(recipe.id)" :key="name">
                {{ name }}
              </li>
            </ul>
            <h3>Instructions</h3>
            <ol>
              <li v-for="(step, index) in recipe.steps" :key="index">
                {{ step }}
              </li>
            </ol>
          </template>
        </section>
      </section>

      <section id="about" class="about">
        <h2>A little better, one meal at a time.</h2>
        <p>FitPal brings recipe discovery and nutrition tracking together.</p>
        <p class="hint">Nutrition totals use illustrative sample data for this prototype.</p>
      </section>
    </main>

    <footer>© 2026 FitPal · Discover food that fits your life.</footer>
  </div>
</template>

<style>
:root {
  font-family: Inter, Arial, sans-serif;
  color: #24382b;
  background: #f7f8f3;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* { box-sizing: border-box; }

body { margin: 0; min-width: 320px; }

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 22px 8%;
  background: white;
  border-bottom: 1px solid #e6ebe3;
}

.logo { font-size: 25px; font-weight: 800; color: #28794c; text-decoration: none; }

nav { display: flex; gap: 24px; }
nav a { color: #66746a; text-decoration: none; font-size: 14px; }

main { max-width: 1100px; margin: auto; padding: 0 24px; }

.hero { padding: 70px 0 55px; text-align: center; }
.eyebrow { color: #398454; font-size: 11px; font-weight: 800; letter-spacing: 2px; }
h1, h2, h3 { letter-spacing: -0.7px; }
h1 { font-size: clamp(40px, 7vw, 65px); line-height: 1.12; }
h1 span { color: #398454; }
.subtitle { color: #718076; line-height: 1.7; }

.search {
  width: min(100%, 600px);
  margin-top: 18px;
  padding: 17px;
  border: 1px solid #dfe7dc;
  border-radius: 12px;
  outline-color: #398454;
  background: white;
}

.hint { color: #859187; font-size: 12px; }

.recipes { padding: 25px 0 60px; }
.section-heading { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; gap: 12px; }
.section-heading h2 { margin-top: 8px; }
.section-heading span { color: #718076; font-size: 13px; }

.recipe-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
.recipe-card { box-shadow: 0 6px 22px #23352c08; }
.empty { padding: 35px; text-align: center; color: #718076; }

.recipe-details {
  position: relative;
  margin-top: 30px;
  padding: 28px;
  border: 1px solid #e3e9df;
  border-radius: 16px;
  background: white;
  line-height: 1.8;
}

.close {
  float: right;
  border: 0;
  padding: 8px 12px;
  border-radius: 8px;
  background: #eef4eb;
  color: #28794c;
  cursor: pointer;
}

.about {
  padding: 35px;
  margin-bottom: 55px;
  border-radius: 18px;
  background: #eaf1e5;
  text-align: center;
}
.about p { color: #718076; }

footer {
  padding: 25px;
  background: white;
  border-top: 1px solid #e6ebe3;
  color: #859187;
  text-align: center;
  font-size: 12px;
}

@media (max-width: 760px) {
  header { padding: 18px 5%; flex-wrap: wrap; }
  nav { gap: 12px; }
  .recipe-grid { grid-template-columns: 1fr; }
}
</style>
