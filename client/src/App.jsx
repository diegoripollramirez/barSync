import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Profile from "./components/profile/profile";
import Navbar from "./components/nav-bar/nav-bar";
import { getFavorites } from "./services/favoritesServices";
import { getInventory } from "./services/inventoryServices";
import IngredientSearch from "./components/profile/inventory/ingredientSearch";
import RecipeList from "./components/profile/recipes/recipe-list";

function App() {
  const [inventory, setInventory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentTab, setCurrentTab] = useState('Home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inv = await getInventory();
        setInventory(inv);

        const fav = await getFavorites();
        setFavorites(fav);
      } catch (error) {
        console.log(error);
      }
    }; fetchData();
  }, []);

  function renderTab() {
    switch (currentTab) {
      case 'Home':
        return (
          <Profile
            inventory={inventory}
            setInventory={setInventory}
            getInventory={getInventory}
            selectedRecipe={selectedRecipe}
            setSelectedRecipe={setSelectedRecipe}
            favorites={favorites}
            setFavorites={setFavorites}
            getFavorites={getFavorites}
          ></Profile>
        );
      case 'IngredientSearch':
        return (
          <IngredientSearch
            inventory={inventory}
            setInventory={setInventory}
          />
        );
      case 'RecipeList':
        return (
          <RecipeList
            inventory={inventory}
            setInventory={setInventory}
            selectedRecipe={selectedRecipe}
            setSelectedRecipe={setSelectedRecipe}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        );
    }
  }

  return <div>
    <Navbar setCurrentTab={setCurrentTab} setSelectedRecipe={setSelectedRecipe} />
    {renderTab()}
  </div>

}

export default App;
