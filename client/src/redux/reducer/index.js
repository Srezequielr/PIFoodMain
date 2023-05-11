import {
  GET_ALL_RECIPES,
  GET_RECIPE_DETAIL,
  GET_DIETS,
  GET_RECIPE_BY_NAME,
  CLEAN_DETAIL,
  SORT_X_HS,
  SORT_X_ALF,
  GET_MY_RECIPES,
  FILTER_X_DIETS,
} from "../actions/types";

const initialState = {
  recipes: [],
  recipeDetail: {},
  diets: [],
  allRecipes: [],
  myRecipes: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      state.allRecipes = action.payload;
      return { ...state, recipes: action.payload };
    case GET_RECIPE_DETAIL:
      return { ...state, recipeDetail: action.payload };
    case GET_DIETS:
      return { ...state, diets: action.payload };
    case GET_RECIPE_BY_NAME:
      return { ...state, recipes: action.payload };
    case CLEAN_DETAIL:
      return { ...state, recipeDetail: {} };
    case SORT_X_HS:
      let sortRecipesByHS = [...state.recipes];
      sortRecipesByHS = sortRecipesByHS.sort((a, b) => {
        if (a.healthScore > b.healthScore) return 1;
        if (a.healthScore < b.healthScore) return -1;
        return 0;
      });
      if (action.payload === 1) {
        sortRecipesByHS = sortRecipesByHS.reverse();
      }
      return { ...state, recipes: sortRecipesByHS };
    case SORT_X_ALF:
      let sortRecipesByAlf = [...state.recipes];
      sortRecipesByAlf = sortRecipesByAlf.sort((a, b) => {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
      });
      if (action.payload === 1) {
        sortRecipesByAlf = sortRecipesByAlf.reverse();
      }
      return { ...state, recipes: sortRecipesByAlf };
    case FILTER_X_DIETS:
      let allRecipes = state.allRecipes;
      state.recipes = allRecipes;
      let pointer = action.payload;
      let recipesFilter = [...state.recipes];
      let results = recipesFilter.filter((recipe) =>
        recipe.diets.some((diet) => diet === pointer)
      );
      if (results.length === 0) {
        results = [null];
      }
      return {
        ...state,
        recipes: results,
      }; // const resultado = perfiles.filter(perfil => criterios.includes(perfil.edad));
    case GET_MY_RECIPES:
      return{...state, myRecipes: action.payload}
    default:
      return { ...state };
  }
};

console.log();

export default rootReducer;

// let pointer = action.payload.flag;
// // console.log("Pointer:", pointer);

// let recipesFilter = [...state.recipes];
// // console.log("Recipes before filter:", recipesFilter);

// const results = recipesFilter.filter((recipe) => {
//   // console.log("Current recipe:", recipe);
//   const dietNames = recipe.diets.map((diet) => diet);
//   // console.log("Diet names in current recipe:", dietNames);
//   const match = dietNames.some((name) => pointer.includes(name));
//   // console.log("Match:", match);
//   return match;
// });
// // console.log("Filtered recipes:", results);
// state.recipesXDiets = [...state.recipesXDiets, results];
// let resultFinal = state.recipesXDiets;
// console.log("mi resultado", resultFinal);
