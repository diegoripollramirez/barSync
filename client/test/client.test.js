import {  describe, expect, test } from "vitest";
import { getFullIngredientList } from "../src/services/ingredientServices";
import { getDrinkDetails } from "../src/services/recipeServices";
import { getFavorites } from "../src/services/favoritesServices";
import { addFavorite } from "../src/services/favoritesServices";
import { removeFavorite } from "../src/services/favoritesServices";
import { IngredientyMock } from "./mocks";
import { RecipeMock } from "./mocks";

describe("testing ingredient fetch", () => {
  test("test first fetched ingredient name", async () => {
    const ingredients = await getFullIngredientList();
    expect(ingredients[1].strIngredient1).toBe(IngredientyMock.strIngredient1);
  });
});

describe("testing recipe fetch", () => {
  test("testing first recipe name", async () => {
    const recipe = await getDrinkDetails(11007);
    expect(recipe.drinkDetail.strDrink).toBe(RecipeMock.strDrink);
  });
});

describe("testing favorites", async () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE3Mzc2MzU2NDcsImV4cCI6MTczNzYzOTI0N30.krpQaLNJLRufv2GFS4_AGJeN1MEoSIGKD-17zuPc3Uw";
  const drinkDetail = {
    strDrink:RecipeMock.strDrink,
    strDrinkThumb:RecipeMock.strDrinkThumb
  }
  test("fetching favorites", async () => {
    const favorites = await getFavorites(token);
    expect(favorites.length).toBe(0);
  });
  test("adding favorite", async () => {
    await addFavorite(RecipeMock.idDrink, drinkDetail, token);
    const favorites = await getFavorites(token);
    expect(favorites.length).toBe(1);
  });
  test("removing favorites", async () => {
    await removeFavorite(RecipeMock.idDrink, token);
    const favorites = await getFavorites(token);
    expect(favorites.length).toBe(0);
  });
});