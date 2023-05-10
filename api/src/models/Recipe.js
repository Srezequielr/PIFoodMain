const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      image: {
        type: DataTypes.STRING,
      },
      healthScore: {
        type: DataTypes.FLOAT,
      },
      summary: {
        type: DataTypes.STRING,
      },
      steps: {
        type: DataTypes.JSONB,
      },
    },
    { timestamps: false }
  );
};
