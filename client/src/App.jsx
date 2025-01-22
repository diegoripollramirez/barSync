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
  const [token, setToken] = useState(localStorage.getItem("token"));
 
  const fetchData = async () => {
    try {
      const inv = await getInventory(token);
      setInventory(inv);

      const fav = await getFavorites(token);
      setFavorites(fav);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {    
    console.log("token changed: ", token)
    if (token) { 
      console.log("we have token, fetching data: ", token)
    fetchData();}
    else {
      setInventory([])
      setFavorites([])
    }
  }, [token]);
  
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
            token={token}
          />
        );
      case 'IngredientSearch':
        return (
          <IngredientSearch
            inventory={inventory}
            setInventory={setInventory}
            token={token}
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
            token={token}
          />
        );
        case 'Login':
        return (
          <Login
          setToken={setToken}
          setCurrentTab={setCurrentTab}  
          />
        );
        case 'Register':
        return (
          <Register
          setToken={setToken}
          setCurrentTab={setCurrentTab}
          />
        );
      default:
        return null;
    }
  };

  return <div>
  <Navbar 
  setCurrentTab={setCurrentTab}
  setSelectedRecipe={setSelectedRecipe}
  setInventory={setInventory}
  setFavorites={setFavorites}
  token={token}
  setToken={setToken}
  />
  {renderTab()}
  </div>
}

export default App;