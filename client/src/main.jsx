import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import IngredientSearch from "./components/profile/inventory/ingredientSearch.jsx";
import RecipeList from "./components/profile/recipes/recipe-list.jsx";
import RecipeDetail from "./components/profile/recipes/recipe-detail.jsx";
import Login from "./components/login/login.jsx";
import Register from "./components/register/register.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ingredientsearch" element={<IngredientSearch />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
