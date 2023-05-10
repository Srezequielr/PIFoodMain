const express = require("express");
const { Recipe } = require("../../db");
const recipesRoute = express.Router();
const { getFoodApi, getMyApi } = require("../functions/utils");

recipesRoute.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const infoFoodApi = await getFoodApi(name, null);
    const infoMyApi = await getMyApi(name, null);
    if (!infoFoodApi && !infoMyApi) {
      console.log("no encontre nada");
      return res.status(200).json([null]);
    }
    if (infoFoodApi && infoMyApi) {
      const result = infoMyApi.concat(infoFoodApi);
      return res.status(200).json(result);
    }
    res.status(200).json(infoFoodApi || infoMyApi);
  } catch (error) {
    res.status(400).send("Error en get de Recipes: " + error.message);
  }
});

recipesRoute.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const infoFoodApi = await getFoodApi(null, id);
    const infoMyApi = await getMyApi(null, id);
    const result = infoMyApi.concat(infoFoodApi);
    res.status(200).json(result);
  } catch (error) {
    res(400).send("Error en ID de Recipes: " + error.message);
  }
});

recipesRoute.post("/", async (req, res) => {
  try {
    let { title, summary, healthScore, steps, diets } = req.body;
    const image = "https://spoonacular.com/recipeImages/641893-312x231.jpg";
    if (!title || !summary || !healthScore || !steps) {
      return res.status(400).send("Falta informacion por proporcionar");
    }
    if (isNaN(healthScore)) {
      return res.status(400).send("Healt Score tiene que ser un numero");
    }
    let recipe = await Recipe.create({
      title: title,
      image: image,
      healthScore: healthScore,
      summary: summary,
      steps: steps,
    });
    // if (!diets.length) diets = [1];
    if (diets.length >= 1) {
      await recipe.setDiets(diets);
    }
    return res.status(201).json(recipe);
  } catch (error) {
    res.status(400).send("Error en Post de Recipes: " + error.message);
  }
});

module.exports = recipesRoute;
