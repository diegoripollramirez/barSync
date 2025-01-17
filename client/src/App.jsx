import { useState, useEffect } from "react";
import Profile from "./components/profile/profile";
import Navbar from "./components/nav-bar/nav-bar";
import { getFavorites } from "./services/favoritesServices";
import { getInventory } from "./services/inventoryServices";
import IngredientSearch from "./components/profile/inventory/ingredientSearch";
import RecipeList from "./components/profile/recipes/recipe-list";
import Login from "./components/login/login";
import Register from "./components/login/register";

function App() {
  const [inventory, setInventory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentTab, setCurrentTab] = useState('Home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
    const fetchData = async () => {
      try {
        const inv = await getInventory();
        setInventory(inv);

        const fav = await getFavorites();
        setFavorites(fav);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();}
  }, []);
  
  const renderTab = () => {
    switch (currentTab) {
      case 'Home':
        return (
          <Profile
            inventory={inventory}
            setInventory={setInventory}
            selectedRecipe={selectedRecipe}
            setSelectedRecipe={setSelectedRecipe}
            favorites={favorites}
            setFavorites={setFavorites}
          />
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
        case 'Login':
        return (
          <Login
            setCurrentTab={setCurrentTab}
          />
        );
        case 'Register':
        return (
          <Register
            setCurrentTab={setCurrentTab}
          />
        );
      default:
        return null;
    }
  };

  return <div>
  <Navbar setCurrentTab={setCurrentTab} setSelectedRecipe={setSelectedRecipe} />
  {renderTab()}
  </div>
}

export default App;