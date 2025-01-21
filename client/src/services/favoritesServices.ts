const url = "http://localhost:3000/favorites";

export async function getFavorites(token) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch favorites");
    }

    const fetchFavorites = await response.json();
    return fetchFavorites;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function addFavorite(drinkId, drinkDetail, token) {
  const { strDrink, strDrinkThumb } = drinkDetail;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ idDrink: drinkId, strDrink, strDrinkThumb }),
  }).catch((error) => {
    console.error("Error adding favorite:", error);
    throw error;
  });
}

export function removeFavorite(drinkId, token) {

  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ idDrink: drinkId }),
  }).catch((error) => {
    console.error("Error removing favorite:", error);
    throw error;
  });
}