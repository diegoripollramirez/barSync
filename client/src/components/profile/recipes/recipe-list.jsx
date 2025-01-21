/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getRecipes } from "../../../services/recipeServices";
import RecipeDetail from "./recipe-detail";

function RecipeList({ inventory, setInventory, selectedRecipe, setSelectedRecipe, favorites, setFavorites, token}) {
  const [recipeFilters, setRecipeFilters] = useState([]);
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (recipeFilters.length) {
          const recip = await getRecipes(recipeFilters);
          setRecipeList(Array.isArray(recip) ? recip : []);
        } else {
          setRecipeList([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [recipeFilters]);

  function addIngredient(event) {
    const ingredient = event.target.value;
    const updatedFilter = recipeFilters.slice();
    updatedFilter.push(ingredient.split(" ").join("_"));
    setRecipeFilters(updatedFilter);
  }

  function removeIngredient(event) {
    const ingredient = event.target.value;
    const idxOfIngredient = recipeFilters.indexOf(ingredient);
    const updatedFilter = recipeFilters.slice();
    updatedFilter.splice(idxOfIngredient, 1);
    setRecipeFilters(updatedFilter);
  }

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <>
      {selectedRecipe ? (
        <RecipeDetail
          recipe={selectedRecipe}
          inventory={inventory}
          setInventory={setInventory}
          favorites={favorites}
          setFavorites={setFavorites}
          token={token}
        />
      ) : (
        <div className="recipe-list-container">
          <div className="inventory-container">
            <p>Select the ingredients you would like to use!</p>
            {inventory.length ? (
              inventory.map((ingredient) => {
                return (
                  <div
                    className="ingredient-container"
                    key={ingredient.strIngredient1}
                  >
                    {ingredient.strIngredient1}
                    <button
                      className="ingredient-button"
                      value={ingredient.strIngredient1}
                      onClick={
                        recipeFilters.includes(
                          ingredient.strIngredient1.split(" ").join("_")
                        )
                          ? removeIngredient
                          : addIngredient
                      }
                    >
                      {recipeFilters.includes(
                        ingredient.strIngredient1.split(" ").join("_")
                      )
                        ? "X"
                        : "+"}
                    </button>
                  </div>
                );
              })
            ) : (
              <p>You have no ingredients in your inventory!</p>
            )}
          </div>
          <div className="recipe-tile-container">
            {recipeList.length ? (
              recipeList.map((recipe) => {
                return (
                  <div
                    className="recipe-tile"
                    key={recipe.idDrink}
                    onClick={() => handleRecipeClick(recipe)}
                  >
                    <img
                      className="recipe-tile-img"
                      src={recipe.strDrinkThumb}
                      alt={recipe.strDrink}
                    />
                    <p className="recipe-tile-text">{recipe.strDrink}</p>
                  </div>
                );
              })
            ) : (
              <p className="recipe-tile-default-text subtitle">
                No recipes to display! Try selecting some ingredients to the left.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}


export default RecipeList;
