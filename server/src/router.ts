import { Router } from "express";
import { getInventory, addIngredient, removeIngredient } from "./controllers/inventoryController";
import { getIngredientList, getRecipeDetails, getFilteredRecipes } from "./controllers/apiController";
import { getFavorites, addFavorite, removeFavorite } from "./controllers/favoritesController";
import { register, login, logout } from "./controllers/userController";

const router = Router();
router.get("/inventory", getInventory);
router.post("/inventory", addIngredient);
router.delete("/inventory", removeIngredient);

router.get("/favorites", getFavorites);
router.post("/favorites", addFavorite);
router.delete("/favorites", removeFavorite);

router.get("/ingredient_list", getIngredientList);
router.get("/recipedetail/:drinkId", getRecipeDetails);
router.get("/filtered_recipes/:filter", getFilteredRecipes);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
