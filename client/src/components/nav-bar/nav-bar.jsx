/* eslint-disable react/prop-types */

import barSyncLogo from "../../assets/barSync_logo.png";

function Navbar({ setCurrentTab, setSelectedRecipe, setInventory, setFavorites, token, setToken}) {
 
  // const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("")
    setInventory([])
    setFavorites([])
    setCurrentTab('Home')
  };

  function handleButton(tab) {
    setCurrentTab(tab);
    setSelectedRecipe("");
  }

  

  return (
    <div className="navbar">
      <div className="hero">
        <img src={barSyncLogo} className="logo" alt="barSync Logo" />
        <h1 className="title">barSync</h1>
      </div>
      <nav className="nav-buttons">
        <button className="nav-button" onClick={() => handleButton('Home')}>
          <p>Home</p>
        </button>
        <button className="nav-button" onClick={() => handleButton('IngredientSearch')}>
          <p>Add Ingredient</p>
        </button>
        <button className="nav-button" onClick={() => handleButton('RecipeList')}>
          <p>Make something?</p>
        </button>
        {token ? (
          <button className="nav-button" onClick={handleLogout}>
            <p>Logout</p>
          </button>
        ) : (
          <button className="nav-button" onClick={() => handleButton('Login')}>
            <p>Login</p>
          </button>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
