import React, { useState } from "react";
import styles from "./Paginated.module.css";

export default function Paginated({ recipesXPage, recipes, paginated }) {
  const pageNumbers = [];
  const [selected, setSelected] = useState(null)


  for (let i = 0; i < Math.ceil(recipes.length / recipesXPage); i++) {
    pageNumbers.push(i + 1);
  }

  const clickHanbler = (number) =>{
    setSelected(number)
    paginated(number)
  }

  return (
    <div className={styles.paginated}>
      {pageNumbers &&
        pageNumbers.map((number) => (
          <button key={number} className={ number !== selected ? styles.unselected : styles.selected} onClick={() => clickHanbler(number)}>{number}</button>
        ))}
    </div>
  );
}
