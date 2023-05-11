import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from "../../redux/actions";
import Recipe from "../Recipe/Recipe";
import Paginated from "../Paginated/Paginated";
import styles from "./Recipes.module.css";
import gifLoad from "../../images/gifLoad.gif";
import noRecipes from "../../images/noRecipes.png";

export default function Recipes(props) {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesXPage] = useState(9);
  const indexLastRecipe = currentPage * recipesXPage;
  const indexFirstRecipe = indexLastRecipe - recipesXPage;

  let currentRecipes;

  if (recipes.length > 9) {
    currentRecipes = recipes.slice(indexFirstRecipe, indexLastRecipe);
  } else {
    currentRecipes = recipes;
  }

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  if (recipes[0] === null) {
    return (
      <div className={styles.loading}>
        {" "}
        <img src={noRecipes} alt="No Recipes" className={styles.gif} />
        Receta inexistente
      </div>
    );
  }

  if (recipes.length >= 1) {
    return (
      <>
        <div className={styles.recipesContainer}>
          {currentRecipes?.map((recipe) => (
            <Recipe
              id={recipe.id}
              key={recipe.id}
              title={recipe.title}
              image={recipe.image}
              diets={recipe.diets}
              healthScore={recipe.healthScore}
            />
          ))}
        </div>
        <div className={styles.paginatedContainer}>
          {recipes.length > 9 ? (
            <Paginated
              recipesXPage={recipesXPage}
              recipes={recipes}
              paginated={paginated}
            />
          ) : null}
        </div>
      </>
    );
  } else {
    return (
      <div className={styles.loading}>
        <img src={gifLoad} alt="Loading gif" className={styles.gif} />
        Cargando recetas...
      </div>
    );
  }
}
