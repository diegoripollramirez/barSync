'use strict'

const url = "http://localhost:3000/inventory";

export async function getInventory() {
  try {
    const response = await fetch(url);
    const fetchInventory = await response.json();
    return fetchInventory;
  } catch (error) {
    console.log(error);
  }
}

export async function addIngredient(ingredient) {
  try {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify( { strIngredient1: ingredient.strIngredient1 } ),
      headers: {
        "Content-Type": "application/json",
      },
    });
    getInventory();
  } catch (error) {
    console.log(error);
  }
}

export async function removeIngredient(ingredient) {
  try {
    await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({ strIngredient1: ingredient.strIngredient1 }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    getInventory();
  } catch (error) {
    console.log(error);
  }
}