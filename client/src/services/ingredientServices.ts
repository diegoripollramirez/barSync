'use strict'

export async function getFullIngredientList() {
  const url = "http://localhost:3000/ingredient_list";
  try {
    const response = await fetch(url);
    const fetchResponse = await response.json();
    if (fetchResponse.drinks.length) {
      return fetchResponse.drinks;
    }
  } catch (error) {
    console.log(error);
  }
}

