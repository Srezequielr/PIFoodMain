import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanDetail, getRecipeDetail } from "../../redux/actions";
import styles from "./RecipeDetails.module.css";
import gifLoad from "../../images/gifLoad.gif";

export function RecipeDetail(props) {
  const { id } = useParams();
  const dispath = useDispatch();
  useEffect(() => {
    dispath(getRecipeDetail(id));
    return () => dispath(cleanDetail());
  }, [dispath, id]);
  let recipeDetail = useSelector((state) => state.recipeDetail);
  recipeDetail = recipeDetail[0];

  if (!recipeDetail) {
    return (
      <div className={styles.loading}>
        <img src={gifLoad} alt="Loading gif" className={styles.gif} />
        Cargando receta...
      </div>
    );
  } else {
    return (
      <div className={styles.recipeDetailContain}>
        <div className={styles.headerContainer}>
          <h2>{recipeDetail.title}</h2>
          <img src={recipeDetail.image} alt="" />
          <p className={styles.id}>Id: {recipeDetail.id}</p>
        </div>
        <div className={styles.dataContainer}>
          <p className={styles.healtScore}>
            Puntos Saludables: {recipeDetail.healthScore}
          </p>
          <div
            className={styles.descriptionContain}
            dangerouslySetInnerHTML={{ __html: recipeDetail.summary }}
          />
          <div className={styles.stepsContainer}>
            {recipeDetail.steps?.map((step) => (
              <div className={styles.step}>
                <p className={styles.stepN}>Paso N° {step.number}</p>
                <p>{step.step}</p>
              </div>
            ))}
          </div>
          <div className={styles.dietsContain}>
            {recipeDetail.diets?.map((diet) => (
              <div className={styles.diet}>{diet}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
