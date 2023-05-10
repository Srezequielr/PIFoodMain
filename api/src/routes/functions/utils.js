const axios = require("axios");
require("dotenv").config();
const { Recipe, Diets } = require("../../db");
const { API_KEY } = process.env;

const getFoodApi = async (name, id) => {
  try {
    const info = await axios
      .get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)
      .then((response) => response.data.results);
    const rInfo = await Promise.all(
      info.map(async (recipe) => {
        return {
          title: recipe.title,
          id: recipe.id,
          image: recipe.image,
          summary: recipe.summary,
          healthScore: recipe.healthScore,
          steps: recipe.analyzedInstructions.map((recipes) =>
            recipes.steps.map((recipe) => {
              return {
                number: recipe.number,
                step: recipe.step,
              };
            })
          )[0],
          diets: recipe.diets,
        };
      })
    );
    if (id) {
      return rInfo.filter((recipe) => recipe.id == id);
    }
    if (name) {
      name = name.split("%20").join(" ");
      //   .padStart(name.length + 1);
      // name = name.padEnd(name.length + 1);
      let result = rInfo.filter((recipe) =>
        recipe.title.toUpperCase().includes(name.toUpperCase())
      );
      if (result.length === 0) {
        return undefined;
      }
      return result;
    }
    return rInfo;
  } catch (error) {
    return "error en getFoodApi: " + error.message;
  }
};

const getMyApi = async (name, id) => {
  try {
    const info = await Recipe.findAll({
      include: [
        {
          model: Diets,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });
    let rInfo = info.map((recipe) => {
      return {
        title: recipe.title,
        id: recipe.id,
        image: recipe.image,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        steps: recipe.steps,
        diets: recipe.diets.map((diet) => {
          return diet.dataValues.name;
        }),
      };
    });
    if (id) {
      return rInfo.filter((recipe) => recipe.id == id);
    }
    if (name) {
      name = name.split("%20").join(" ");
      //   .padStart(name.length + 1);
      // name = name.padEnd(name.length + 1);
      let result = rInfo.filter((recipe) =>
        recipe.title.toUpperCase().includes(name.toUpperCase())
      );
      if (result.length === 0) {
        return undefined;
      }
      return result;
    }
    return rInfo;
  } catch (error) {}
};

module.exports = {
  getFoodApi,
  getMyApi,
};
