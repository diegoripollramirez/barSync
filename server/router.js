const router = require("express").Router();
const authMiddleware = require("./middleware/auth");
const inventoryController = require("./controllers/inventoryController.js");
const apiController = require("./controllers/apiController.js");
const favoriteController = require("./controllers/favoritesController.js");
const userController = require("./controllers/userController.js")

router.get("/inventory", inventoryController.getInventory);
router.post("/inventory", inventoryController.addIngredient);
router.delete("/inventory", inventoryController.removeIngredient);

router.get("/favorites", authMiddleware, favoriteController.getFavorites);
router.post("/favorites", authMiddleware, favoriteController.addFavorite);
router.delete("/favorites", authMiddleware, favoriteController.removeFavorite);

router.get("/ingredient_list", apiController.getIngredientList);
router.get("/recipedetail/:drinkId", apiController.getRecipeDetails);
router.get("/filtered_recipes/:filter", apiController.getFilteredRecipes);

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

module.exports = router;
