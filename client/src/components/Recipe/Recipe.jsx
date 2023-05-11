import React from "react";
import { Link } from "react-router-dom";
import styles from "./Recipe.module.css";

export default function Recipe({ title, id, image, diets }) {
  return (
    <div className={styles.recipeContainer}>
      <div className={styles.imgContainer}>
        <img src={image} alt={title} className="RecipeImg" />
      </div>
      <div className="dataContainer">
        <Link className={styles.link} to={`recipes/${id}`}>
          <p className={diets.title}>{title}</p>
        </Link>
        <p className={styles.diets}>
          {diets.length === 0 ? "No hay dietas" : "Dietas"}
        </p>
        <div className={styles.dietsContainer}>
          {diets?.map((diet, index) => (
            <div key={index} className={styles.target}>
              <p>{diet}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
