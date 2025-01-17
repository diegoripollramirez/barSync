'use strict'

const url = "http://localhost:3000/favorites";

  export async function getFavorites() {
    try {
      const response = await fetch(url);
      const fetchFavorites = await response.json();
      return fetchFavorites;
    } catch (error) {
      console.log(error);
    }
  }

  export function addFavorite(drinkId, drinkDetail) {
    const { strDrink, strDrinkThumb } = drinkDetail;
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idDrink: drinkId, strDrink, strDrinkThumb }),
    }).catch((error) => {
      console.error("Error adding favorite:", error);
      throw error;
    });
  }

  export function removeFavorite(drinkId) {
    return fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idDrink: drinkId }),
    }).catch((error) => {
      console.error("Error removing favorite:", error);
      throw error;
    });
  }