/* eslint-disable react/prop-types */
import Ingredient from "./ingredient";

function Inventory({ inventory, setInventory, token }) {
  return (
    <>
      <h2 className="subtitle">Inventory:</h2>
      {inventory.length ? (
        inventory.map((ingredient) => {
          return (
            <Ingredient
              key={ingredient.strIngredient1}
              ingredient={ingredient}
              inventory={inventory}
              setInventory={setInventory}
              token={token}
            ></Ingredient>
          );
        })
      ) : (
        <p>No ingredients! Select Add Ingredient above to begin!</p>
      )}
    </>
  );
}

export default Inventory;
