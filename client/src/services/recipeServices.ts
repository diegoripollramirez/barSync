'use strict'

export async function getRecipes(recipeFilters) {
  const url = "http://localhost:3000/filtered_recipes/";
  const filter = recipeFilters.join("|");//Why this 9?
  try {
    const response = await fetch(url + filter);
    const fetchResponse = await response.json();
    return fetchResponse.drinks;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export function getDrinkDetails(drinkId) {
  const url = "http://localhost:3000/recipedetail/" + drinkId;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.drinks.length) {
        const recipe = data.drinks[0];
        const ingredients = Object.keys(recipe)
          .filter((key) => key.includes("strIngredient") && recipe[key])
          .map((key) => ({ strIngredient1: recipe[key] }));
        return { drinkDetail: recipe, drinkIngredients: ingredients };
      }
      return { drinkDetail: null, drinkIngredients: [] };
    })
    .catch((error) => {
      console.error("Error fetching recipe details:", error);
      throw error;
    });
}