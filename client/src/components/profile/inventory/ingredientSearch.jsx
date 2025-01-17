import { useEffect, useState } from "react";
import Ingredient from "./ingredient";
import { getFullIngredientList } from "../../../services/ingredientServices";

function IngredientSearch({ inventory, setInventory }) {
  const [fullIngredientList, setFullIngredientList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredIngredientList, setFilteredIngredientList] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const ingr = await getFullIngredientList();
        setFullIngredientList(ingr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    filterList();
  }, [searchText]);


  function handleChange(event) {
    setSearchText(event.target.value.toLowerCase());
  }

  function filterList() {
    const filteredList = fullIngredientList.filter((el) =>
      el.strIngredient1.toLowerCase().includes(searchText)
    );
    setFilteredIngredientList(filteredList);
  }

  return (
    <>
      <div className="search-container">
        <div className="search-bar">
          <h2 className="subtitle">Welcome to the ingredient search!</h2>
          <p>
            Start typing below to filter for ingredients to add to your
            inventory.
          </p>
          <input
            className="search-field"
            type="text"
            onChange={handleChange}
          ></input>
        </div>
        <div className="search-results-container">
          {searchText!="" && filteredIngredientList.length > 0 //filteredIngredientList.length < 20 &&
            ? (filteredIngredientList.map((ingredient) => {
              return (
                <Ingredient
                  key={ingredient.strIngredient1}
                  ingredient={ingredient}
                  inventory={inventory}
                  setInventory={setInventory}
                ></Ingredient>
              );
            }))
            : (
              <p className="search-results-placeholder">
                Start typing to filter ingredients!
              </p>
            )}
        </div>
      </div>
    </>
  );
}

export default IngredientSearch;
