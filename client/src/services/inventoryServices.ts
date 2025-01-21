'use strict'

const url = "http://localhost:3000/inventory";

export async function getInventory(token) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {  
        "Content-Type": "application/json",      
        "Authorization": `Bearer ${token}`
      },
      });
    const fetchInventory = await response.json();
    return fetchInventory;
  } catch (error) {
    console.log(error);
  }
}

export async function addIngredient(ingredient, token) {
  try {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify( { strIngredient1: ingredient.strIngredient1 } ),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    getInventory(token);
  } catch (error) {
    console.log(error);
  }
}

export async function removeIngredient(ingredient, token) {
  try {
    await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({ strIngredient1: ingredient.strIngredient1 }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    getInventory(token);
  } catch (error) {
    console.log(error);
  }
}