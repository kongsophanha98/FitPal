
<script setup lang="ts">
import type { Recipe } from '../types'

defineProps<{
  recipe: Recipe
  calories: number
  ingredientNames: string[]
}>()

const emit = defineEmits<{
  view: [recipeId: number]
}>()
</script>

<template>
  <article class="recipe-card">
    <div class="recipe-image">
      <span>🥗</span>
    </div>

    <div class="recipe-content">
      <span v-if="recipe.isOfficial" class="badge">FitPal Official</span>
      <h3>{{ recipe.title }}</h3>

      <p class="calories">🔥 {{ calories }} kcal</p>
      <p class="ingredients">
        {{ ingredientNames.join(' · ') }}
      </p>
      <p class="servings">Serves {{ recipe.servings }}</p>

      <button @click="emit('view', recipe.id)">
        View recipe
      </button>
    </div>
  </article>
</template>

<style scoped>
.recipe-card {
  overflow: hidden;
  border: 1px solid #e3e9df;
  border-radius: 16px;
  background: white;
}

.recipe-image {
  display: grid;
  min-height: 120px;
  place-items: center;
  background: #edf3e8;
  font-size: 48px;
}

.recipe-content {
  padding: 18px;
}

.badge {
  color: #28794c;
  font-size: 11px;
  font-weight: 700;
}

h3 {
  margin: 10px 0;
  color: #23352c;
}

.calories {
  color: #28794c;
  font-weight: 700;
}

.ingredients,
.servings {
  color: #718076;
  font-size: 13px;
}

button {
  width: 100%;
  padding: 11px;
  border: 0;
  border-radius: 9px;
  background: #28794c;
  color: white;
  cursor: pointer;
}
</style>
