"use strict";
import { Request, Response } from "express";

const url:string = process.env.API_URL || "";
const api_key:string = process.env.API_KEY || "";

export const getIngredientList = async (req:Request, res:Response): Promise<void>=> {
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

export const getFilteredRecipes = async (req:Request, res:Response): Promise<void> => {
  const convertedFilter = req.params.filter.replace(/\|/g, ",");

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

export const getRecipeDetails = async (req:Request, res:Response): Promise<void> => {
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
