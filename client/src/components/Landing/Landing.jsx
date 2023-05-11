import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import landingPhoto from "../../images/landingPhoto.jpg";

export default function Landing(props) {
  return (
    <div className={styles.landingContainer}>
      <div className={styles.textContain}>
        <div className={styles.titleContain}>
          <h1>¡Bienvenido a tu libro de Cocina+!</h1>
        </div>
        <h2>¿Quieres ser un maestro de la cocina?</h2>
        <p>
          ¡Entonces este es el lugar indicado! <br />
          Con Cocina+ vas a tener al alcance de tu mano un extenso abanico de
          recetas de todo tipo. <br />
          Todas las recetas que necesites la tendras aqui, recetas de todas
          partes del mundo y con las dietas que necesites.
        </p>
        <h3>¿Estas Listo?</h3>
        <div className={styles.buttonContain}>
        <Link className={styles.button} to="/home">
          <p >¡VAMOS!</p>
        </Link>
        </div>
      </div>
      <div className={styles.imageConteiner}>
        <img
          src={landingPhoto}
          alt="Landing"
          className={styles.landingImage}
        />
      </div>
    </div>
  );
}
