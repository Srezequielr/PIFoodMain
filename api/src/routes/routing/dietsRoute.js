const express = require("express");
const dietsRoute = express.Router();
const { Diets } = require("../../db");

dietsRoute.get("/", async (req, res) => {
  try {
    const data = await Diets.findAll();
    return res.status(200).send(data);
  } catch (error) {
    res.status(400).send("Error en Get de Diets: " + error.message);
  }
});

module.exports = dietsRoute;
