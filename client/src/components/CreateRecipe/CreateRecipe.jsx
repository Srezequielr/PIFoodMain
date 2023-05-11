import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets } from "../../redux/actions";
import styles from "./CreateRecipe.module.css";

export function CreateRecipe(props) {
  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();
  let [form, setForm] = useState({
    title: null,
    summary: null,
    healthScore: 0,
    diets: [],
  });

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const changeHandler = (event) => {
    const pointer = event.target.name;
    const data = event.target.value;
    setForm({ ...form, [pointer]: data });
  };

  const [steps, setSteps] = useState([{ step: "", number: 0 }]);

  const handleAddStep = () => {
    setSteps([...steps, { step: "", number: 0 }]);
  };

  const handleStepChange = (index, event) => {
    const newSteps = [...steps];
    newSteps[index].step = event.target.value;
    newSteps[index].number = index + 1;
    setSteps(newSteps);
  };

  const checkBoxHandler = (event) => {
    const pointer = event.target.id;
    if (form.diets.indexOf(pointer) !== -1) {
      console.log("Ya tengo esa dieta cargada, la voy a borrar");
      let filter = form.diets.filter((diet) => diet !== pointer);
      setForm({
        ...form,
        diets: filter,
      });
    } else {
      setForm({ ...form, diets: [...form.diets, pointer] });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("entre al submit");
    console.log(
      "titulo:",
      form.title,
      "resumen:",
      form.summary,
      "Pasos:",
      steps.length,
      "puntos saludables",
      form.healthScore
    );
    if (!form.title || !form.summary || steps.length === 1 || form.healthScore === 0) {
      return alert("Faltan datos obligatorios para crear la receta")
    }
    form.title = form.title.charAt(0).toUpperCase() + form.title.slice(1);
    let data = { ...form, steps: steps };
    console.log("body de create", data);
    axios.post("http://localhost:3001/recipes", data);
    alert("Receta creada correctamente");
  };

  // const disableButton = () => {
  //   if (form.title === null || form.healthScore === 0 || form.summary) {
  //     return true;
  //   }
  // };

  return (
    <div>
      <h1 className={styles.titleContain}>¡Agrega tu Receta!</h1>
      <div className={styles.formContain}>
        <form className={styles.form}>
          <div className={styles.dataContain}>
            <div>
              <label>Nombre:</label> <br /> <br />
              <input
                className={styles.input}
                type="text"
                name="title"
                value={form.title}
                onChange={changeHandler}
              />
              <br />
              <br />
              {/* <p
                className="error"
                style={{ visibility: form.title && "hidden" }}
              >
                Se requiere un nombre
              </p> */}
            </div>
            <div>
              <label>Resumen:</label> <br /> <br />
              <textarea
                className={styles.textArea}
                name="summary"
                value={form.summary}
                onChange={changeHandler}
              />
            </div>
          </div>

          <div className={styles.data2Container}>
            <h2>Seleccionar dietas</h2>
            <div className={styles.dietsContain}>
              {diets.map((diet) => (
                <div key={diet.id} className={styles.itemsContainer}>
                  <label htmlFor={diet.id}>{diet.name}</label>
                  <input
                    className={styles.checkBox}
                    key={diet.id}
                    type="checkbox"
                    onChange={checkBoxHandler}
                    name={diet.name}
                    id={diet.id}
                  />
                </div>
              ))}
            </div>
            <div>
              <br /> <br />
              <label> Puntos Saludables:</label> <br /> <br />
              <input
                className={styles.input}
                type="number"
                min={0}
                max={100}
                name="healthScore"
                value={form.healthScore}
                onChange={changeHandler}
              />
            </div>
          </div>
        </form>
      </div>
      <div className={styles.stepsContainer}>
        <form>
          <h2>Añadir pasos</h2>
          <div className={styles.steps}>
            {steps.map((step, index) => (
              <div key={index}>
                <textarea
                  className={styles.textStep}
                  placeholder={`Step ${index + 1}`}
                  value={step.step}
                  onChange={(event) => handleStepChange(index, event)}
                />
              </div>
            ))}
          </div>
          <button
            className={styles.addStep}
            type="button"
            onClick={handleAddStep}
          >
            Añadir paso
          </button>{" "}
        </form>
        <button
          className={styles.create}
          // disabled={disableButton}
          onClick={handleSubmit}
        >
          Crear Receta
        </button>
      </div>
    </div>
  );
}

// import React, { useState } from "react";

// export function CreateRecipe(props) {
//   const [steps, setSteps] = useState([{ title: "" }]);

//   const handleAddStep = () => {
//     setSteps([...steps, { title: "" }]);
//   };

//   const handleTitleChange = (index, event) => {
//     const newSteps = [...steps];
//     newSteps[index].title = event.target.value;
//     setSteps(newSteps);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Envía los datos del formulario
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//   {steps.map((step, index) => (
//     <div key={index}>
//       <input
//         type="text"
//         placeholder={`Step ${index + 1}`}
//         value={step.title}
//         onChange={(event) => handleTitleChange(index, event)}
//       />
//     </div>
//   ))}
//   <button type="button" onClick={handleAddStep}>
//     Agregar paso
//   </button>
//       <button type="submit">Guardar</button>
//     </form>
//   );
// }
