import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterXDiets,
  getAllRecipes,
  getDiets,
  sortXAlb,
  sortXHS,
} from "../../redux/actions";
import styles from "./Filters.module.css";

export default function Filters(props) {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const [checkAlp1, setCheckAlp1] = useState(false);
  const [checkAlp2, setCheckAlp2] = useState(false);
  const [checkHS3, setCheckHS3] = useState(false);
  const [checkHS4, setCheckHS4] = useState(false);
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const changeCheckAlp = (event) => {
    const { name, checked } = event.target;
    setCheckHS3(false);
    setCheckHS4(false);
    setCheckAlp1(name === "checkAlp1" ? checked : false);
    setCheckAlp2(name === "checkAlp2" ? checked : false);
    if (name === "checkAlp1") {
      dispatch(sortXAlb(0));
    } else {
      dispatch(sortXAlb(1));
    }
  };

  const changeCheckHS = (event) => {
    const { name, checked } = event.target;
    setCheckAlp1(false);
    setCheckAlp2(false);
    setCheckHS3(name === "checkHS1" ? checked : false);
    setCheckHS4(name === "checkHS2" ? checked : false);
    if (name === "checkHS1") {
      dispatch(sortXHS(0));
    } else {
      dispatch(sortXHS(1));
    }
  };

  const reset = () => {
    setCheckAlp1(false);
    setCheckAlp2(false);
    setCheckHS3(false);
    setCheckHS4(false);
    dispatch(getAllRecipes());
    setSelected(null)
  };

  const checkBoxHandler = (event) => {
    const pointer = event.target.name;
    setSelected(pointer)
    dispatch(filterXDiets(pointer));
  };

  return (
    <div className={styles.filtersContainer}>
      <h2 className={styles.titleF}>Ordenar por:</h2>
      <div className={styles.alpHS}>
        <div className={styles.checksContainers}>
          <h3>Puntos saludables</h3>
          <div className={styles.itemsContainer}>
            <label htmlFor="crec">Creciente</label>
            <input
              id="crec"
              className={styles.checkBox}
              type="checkbox"
              checked={checkHS3}
              name="checkHS1"
              onChange={changeCheckHS}
            />{" "}
            <label htmlFor="dec">Decreciente</label>
            <input
              id="dec"
              className={styles.checkBox}
              type="checkbox"
              checked={checkHS4}
              name="checkHS2"
              onChange={changeCheckHS}
            />{" "}
          </div>
        </div>
        <div className={styles.checksContainers}>
          <h3>Orden alfabético</h3>
          <div className={styles.itemsContainer}>
            <label htmlFor="a-z">A - Z</label>
            <input
              id="a-z"
              className={styles.checkBox}
              type="checkbox"
              checked={checkAlp1}
              name="checkAlp1"
              onChange={changeCheckAlp}
            />
            <label htmlFor="z-a">Z - A</label>
            <input
              id="z-a"
              className={styles.checkBox}
              type="checkbox"
              checked={checkAlp2}
              name="checkAlp2"
              onChange={changeCheckAlp}
            />
          </div>
        </div>
      </div>
      <div className={styles.dietsFilContainer}>
        {diets?.map((diet) => (
          <button
            onClick={checkBoxHandler}
            key={diet.id}
            id={diet.id}
            name={diet.name}
            className={
              diet.name !== selected ? styles.unselected : styles.selected
            }
          >
            {diet.name}
          </button>
        ))}
      </div>
      <button onClick={reset} className={styles.resetButton}>
        Reiniciar filtros
      </button>
    </div>
  );
}
