import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../../redux/actions";
import styles from "./Search.module.css";
import Filters from "../Filters/Filters";

export default function Search(props) {
  const [recipe, setRecipe] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (event) => {
    setRecipe(event.target.value);
  };

  const search = (event) => {
    event.preventDefault();
    dispatch(getRecipeByName(recipe));
  };

  return (
    <>
      <div className={styles.searchFilterContain}>
        <div className={styles.inputContain}>
          <form>
            <label>
              <input
                className={styles.input}
                type="text"
                placeholder="Buscar Receta"
                onChange={changeHandler}
                value={recipe}
              />
              <button className={styles.searchButton} onClick={search}>
                Buscar
              </button>
            </label>
          </form>
        </div>
      </div>
      <Filters />
    </>
  );
}
