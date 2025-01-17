"use strict";

const url = process.env.API_URL;
const api_key = process.env.API_KEY;

exports.getIngredientList = async (req, res) => {
  const ingredientListUrl = url + api_key + "/list.php?i=list";
  try {
    const response = await fetch(ingredientListUrl);
    const fetchResponse = await response.json();
    res.status(201);
    res.send(fetchResponse);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

exports.getFilteredRecipes = async (req, res) => {
  const convertedFilter = req.params.filter.replaceAll("|", ",");

  const recipeListUrl = url + api_key + "/filter.php?i=" + convertedFilter;
  try {
    const response = await fetch(recipeListUrl);
    const fetchResponse = await response.json();
    res.status(201);
    res.send(fetchResponse);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

exports.getRecipeDetails = async (req, res) => {
  const recipeDetailUrl = url + api_key + "/lookup.php?i=" + req.params.drinkId;
  try {
    const response = await fetch(recipeDetailUrl);
    const fetchResponse = await response.json();
    res.status(201);
    res.send(fetchResponse);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
