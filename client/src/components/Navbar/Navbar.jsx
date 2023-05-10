import React from "react";
import { Link } from "react-router-dom";
import icon from "../../images/comida+Icon.png";
import styles from "./Navbar.module.css";

export default function Navbar(props) {
  return (
    <>
      <div className={styles.navBar}>
        <div className={styles.logoContain}>
          <Link className={styles.logoLink} to="/home">
            <img src={icon} alt="Logo Cocina+" className={styles.logo} />
            <p className={styles.textLogo}>Comida+</p>
          </Link>
        </div>
        <div className={styles.targetContain}>
          <Link className={styles.link} to="/createRecipe">
            <p>Crear Receta</p>
          </Link>
          <Link className={styles.link} to="/myRecipes">
            <p>Mis Recetas</p>
          </Link>
        </div>
      </div>
    </>
  );
}
