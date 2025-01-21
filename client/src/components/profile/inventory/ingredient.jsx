/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { addIngredient } from "../../../services/inventoryServices";
import { removeIngredient } from "../../../services/inventoryServices";

function Ingredient({ ingredient, inventory, setInventory, token }) {

  const [added, setAdded] = useState(false);
  const plainTextInventory = inventory.map((el) => el.strIngredient1);
  

  useEffect(() => {
    if (
      inventory.length &&
      plainTextInventory.includes(ingredient.strIngredient1)
    ) {
      setAdded(true);
    } else {
      setAdded(false);
    }
  }, [inventory]);

  async function addToInventory(ingredient, token) {
    try {
      console.log(token);
      if (token){
      await addIngredient(ingredient, token);
      }
      setInventory((prev) => [...prev, ingredient]);
    } catch (error) {
      console.log(error);
    }
  }

  
  async function removeFromInventory(ingredient, token) {
    try {
      if (token){
      await removeIngredient(ingredient, token);
      }
      setInventory((prevInventory) =>
        prevInventory.filter(
          (item) => item.strIngredient1 !== ingredient.strIngredient1
        )
      );
    } catch (error) {console.log(error)}
  }

  return (
    <>
      <div className="ingredient-container">
        <p>{ingredient.strIngredient1}</p>
        <button
          className="ingredient-button"
          onClick={() =>
            added ? removeFromInventory(ingredient, token) : addToInventory(ingredient, token)
          }
        >
          {added
            ? String.fromCodePoint("0x1F5D1")
            : String.fromCodePoint("0x1F378")}
        </button>
      </div>
    </>
  );
}

export default Ingredient;
