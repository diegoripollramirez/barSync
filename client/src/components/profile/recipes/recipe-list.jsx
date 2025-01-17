import { useEffect, useState } from "react";
import Navbar from "../../nav-bar/nav-bar";
import { Link } from "react-router";

function RecipeList() {
  const [inventory, setInventory] = useState([]);
  const [recipeFilters, setRecipeFilters] = useState([]);
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    if (!inventory.length) {
      getInventory();
    }
    if (recipeFilters.length) {
      getRecipes();
    } else {
      setRecipeList([]);
    }
  }, [recipeFilters]);

  async function getInventory() {
    const url = "http://localhost:3000/inventory";
    try {
      const response = await fetch(url);
      const fetchInventory = await response.json();
      if (fetchInventory.length) {
        setInventory(fetchInventory);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getRecipes() {
    const url = "http://localhost:3000/filtered_recipes/";
    const filter = recipeFilters.join("9");
    try {
      const response = await fetch(url + filter);
      const fetchResponse = await response.json();
      if (
        fetchResponse.drinks.length &&
        fetchResponse.drinks !== "None Found"
      ) {
        setRecipeList(fetchResponse.drinks);
      }
    } catch (error) {
      console.log(error);
    }
  }

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

  return (
    <>
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
                <div className="recipe-tile" key={recipe.idDrink}>
                  <Link to={"/recipe/" + recipe.idDrink}>
                    <img
                      className="recipe-tile-img"
                      src={recipe.strDrinkThumb}
                    ></img>
                  </Link>
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
    </>
  );
}

export default RecipeList;
