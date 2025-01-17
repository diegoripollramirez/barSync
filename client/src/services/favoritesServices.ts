'use strict'

  export async function getFavorites() {
    const url = "http://localhost:3000/favorites";
    try {
      const response = await fetch(url);
      const fetchFavorites = await response.json();
      return fetchFavorites;
    } catch (error) {
      console.log(error);
    }
  }