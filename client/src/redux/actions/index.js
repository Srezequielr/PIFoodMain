import axios from "axios";
import {
  GET_ALL_RECIPES,
  GET_RECIPE_DETAIL,
  GET_DIETS,
  GET_RECIPE_BY_NAME,
  CLEAN_DETAIL,
  SORT_X_HS,
  SORT_X_ALF,
  FILTER_X_DIETS,
  GET_MY_RECIPES,
  LOCAL_HOST,
} from "./types";

export const getAllRecipes = () => {
  return async function (dispatch) {
    try {
      const data = await axios
        .get(`${LOCAL_HOST}/recipes`)
        .then((response) => response.data);
      return dispatch({ type: GET_ALL_RECIPES, payload: data });
    } catch (error) {
      console.error("Error in action getAllRecipes: ", error.message);
    }
  };
};

export const getRecipeDetail = (id) => {
  return async function (dispatch) {
    try {
      const data = await axios
        .get(`${LOCAL_HOST}/recipes/${id}`)
        .then((response) => response.data);
      return dispatch({ type: GET_RECIPE_DETAIL, payload: data });
    } catch (error) {
      console.error("Error in action getRecipeDetail: ", error.message);
    }
  };
};

export const getDiets = () => {
  return async function (dispatch) {
    try {
      const data = await axios
        .get("http://localhost:3001/diets")
        .then((response) => response.data);
      return dispatch({ type: GET_DIETS, payload: data });
    } catch (error) {
      console.error("Error in action getDiets: ", error.message);
    }
  };
};

export const getRecipeByName = (name) => {
  console.log("entre a get by name");
  return async function (dispatch) {
    try {
      const data = await axios(
        `http://localhost:3001/recipes?name=${name}`
      ).then((response) => response.data);
      return dispatch({ type: GET_RECIPE_BY_NAME, payload: data });
    } catch (error) {
      console.error("Error in action getRecipeByName: ", error.message);
    }
  };
};

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};

export const sortXHS = (flag) => {
  return { type: SORT_X_HS, payload: flag };
};

export const sortXAlb = (flag) => {
  return { type: SORT_X_ALF, payload: flag };
};

// export const filterXDiets = (flag) => {
//   return { type: FILTER_X_DIETS, payload: flag };
// };

export const filterXDiets = (flag) => {
  return { type: FILTER_X_DIETS, payload: flag };
};

export const getMyRecipes = () => {
  return async function (dispatch) {
    try {
      const data = await axios
        .get(`${LOCAL_HOST}/recipes`)
        .then((response) => response.data);
        let result = data.filter((recipe) => isNaN(recipe.id));
        if (result.length === 0) {
        result = [null]
      }
      dispatch({type: GET_MY_RECIPES, payload: result})
    } catch (error) {
      console.error("Error in action getMyRecipes: ", error.message);
    }
  };
};
