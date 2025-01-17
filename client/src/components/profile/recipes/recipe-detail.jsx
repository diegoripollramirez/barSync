/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Ingredient from "../inventory/ingredient";
import { addFavorite } from "../../../services/favoritesServices";
import { removeFavorite } from "../../../services/favoritesServices";
import { getDrinkDetails } from "../../../services/recipeServices";

function RecipeDetail({
  recipe,
  inventory,
  setInventory,
  favorites,
  setFavorites,
}) {
  const [favorited, setFavorited] = useState(false);
  const [drinkDetail, setDrinkDetail] = useState(null);
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const token = localStorage.getItem("token");
  console.log("Esto", token);

  useEffect(() => {
    const fetchDrinkDetails = async () => {
      try {
        const { drinkDetail, drinkIngredients } = await getDrinkDetails(
          recipe.idDrink
        );
        setDrinkDetail(drinkDetail);
        setDrinkIngredients(drinkIngredients);
        setFavorited(
          favorites.some((fav) => fav.idDrink == Number(recipe.idDrink))
        );
      } catch (error) {
        console.error("Error loading drink details:", error);
      }
    };
    fetchDrinkDetails();
  }, []);

  async function handleAddFavorite() {
    try {
      if (token) {
        await addFavorite(recipe.idDrink, drinkDetail);
      }
      setFavorited(true);
      setFavorites((prevFavorites) => [
        ...prevFavorites,
        { idDrink: recipe.idDrink, ...drinkDetail },
      ]);
      setFavorites((prevFavorites) => [
        ...prevFavorites,
        { idDrink: recipe.idDrink, ...drinkDetail },
      ]);
    } catch (error) {
      console.error("Error adding to favorites:", error);
      
    }
  }

  
  async function handleRemoveFavorite() {
    try {
      if (token) {
        await removeFavorite(recipe.idDrink);
      }
      setFavorited(false);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.idDrink !== recipe.idDrink)
      );
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.idDrink !== recipe.idDrink)
      );
    } catch (error) {
      console.error("Error removing from favorites:", error);
      
    }
  }

  return (
    <>
      <div className="recipe-detail-container">
        {drinkDetail ? (
          <>
            <div className="recipe-tile">
              <img
                src={drinkDetail.strDrinkThumb}
                className="recipe-tile-img"
              />
              <p className="recipe-tile-text">{drinkDetail.strDrink}</p>
            </div>
            <div className="inventory-container margin-top">
              <h2>Ingredients</h2>
              {drinkIngredients.length ? (
                drinkIngredients.map((ingredient) => {
                  return (
                    <Ingredient
                      key={ingredient.strIngredient1}
                      ingredient={ingredient}
                      inventory={inventory}
                      setInventory={setInventory}
                    />
                  );
                })
              ) : (
                <p>no ingredients?</p>
              )}
            </div>
          </>
        ) : (
          <p>None found...</p>
        )}
        <div className="inventory-container margin-top margin-right">
          {drinkDetail ? (
            <>
              <h2>Instructions:</h2>
              <p className="instructions-text margin-top">
                {drinkDetail.strInstructions}
              </p>
              <div className="ingredient-container">
                <p>
                  {favorited ? "Remove from favorites?" : "Add to favorites?"}
                </p>
                <button
                  className="ingredient-button"
                  onClick={favorited ? handleRemoveFavorite : handleAddFavorite}
                  
                >
                  {favorited
                    ? String.fromCodePoint("0x1F494")
                    : String.fromCodePoint("0x1F9E1")}
                </button>
              </div>
            </>
          ) : (
            <p>No instructions found!</p>
          )}
        </div>
      </div>
    </>
  );
}

export default RecipeDetail;
