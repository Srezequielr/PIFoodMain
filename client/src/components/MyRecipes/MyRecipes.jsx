import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyRecipes } from "../../redux/actions";
import Recipe from "../Recipe/Recipe";
import Paginated from "../Paginated/Paginated";
import styles from "../Recipes/Recipes.module.css";
import gifLoad from "../../images/gifLoad.gif";
import noRecipes from "../../images/noRecipes.png";

export default function MyRecipes(props) {
  const dispatch = useDispatch();
  let myRecipes = useSelector((state) => state.myRecipes);

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesXPage] = useState(9);
  const indexLastRecipe = currentPage * recipesXPage;
  const indexFirstRecipe = indexLastRecipe - recipesXPage;

  let currentRecipes;

  if (myRecipes.length > 9) {
    currentRecipes = myRecipes.slice(indexFirstRecipe, indexLastRecipe);
  } else {
    currentRecipes = myRecipes;
  }

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getMyRecipes());
  }, [dispatch]);

  if (myRecipes[0] === null) {
    return (
      <div className={styles.loading}>
        {" "}
        <img src={noRecipes} alt="No Recipes" className={styles.gif} />
        ¡No has cargado recetas!
      </div>
    );
  }

  if (myRecipes.length >= 1) {
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
            />
          ))}
        </div>
        <div className={styles.paginatedContainer}>
          {myRecipes.length > 9 ? (
            <Paginated
              recipesXPage={recipesXPage}
              recipes={myRecipes}
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
