/* eslint-disable react/prop-types */
import Inventory from "./inventory/inventory";
import RecipeDetail from "./recipes/recipe-detail";

function Profile({ inventory, setInventory, favorites, setFavorites, selectedRecipe, setSelectedRecipe }) {
  return (
    <>
      {selectedRecipe ? (
        <RecipeDetail
          recipe={selectedRecipe}
          inventory={inventory}
          setInventory={setInventory}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      ) : (
        <div className="profile-container">
          <div className="profile-section-1">

            <div className="welcome-text">
              <h2 className="subtitle">Welcome to barSync!</h2>
              <p>
                To the right you will see your ingredient inventory where you can
                store ingredients you already own.
              </p>
              <p>
                If you wish to add a new ingredient select the button in the bar
                above.
              </p>
              <p>Want to make something? Select the button in the bar above.</p>
            </div>

            <div className="inventory-container">
              <Inventory
                inventory={inventory}
                setInventory={setInventory}
              ></Inventory>
            </div>
          </div>

          <div className="profile-section-2">
            <h2 className="subtitle favorite-text">Favorites:</h2>
            <div className="recipe-favorites-container">
              {favorites.length ? (
                favorites.map((favorite) => {
                  return (
                    <div className="recipe-tile" key={favorite.idDrink}
                      onClick={() => setSelectedRecipe(favorite)}
                    >
                      <img
                        className="recipe-tile-img"
                        src={favorite.strDrinkThumb}
                        alt={favorite.strDrink}
                      ></img>
                      <p className="recipe-tile-text">{favorite.strDrink}</p>
                    </div>
                  );
                })
              ) : (
                <p className="recipe-tile-default-text subtitle">
                  No favorites to display! Take a look at some recipes to add
                  some!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
