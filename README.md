

# **Individual Proyect** - Comida+ 🥑 - Henry

<img height="150" src="./comida+Icon.png" />

## Presentacion 🗣️

Este es mi segundo proyecto individual de Henry donde suve que de llevar a cabo una SPA donde gestiono datos de una API externa (spoonacular) para mostrar recetas de cocina y al mismo tiempo gestionar datos de una base de datos propia que permite cargar recetas personalizadas.

## Historia 📚

Este proyecto lo inicie en abril de 2023 Luego de unas breves vacaciones despues de no cumplir con los requisitos del anterior proyecto individual, tiempo despues de aprobado el proyecto decidi arreglarle algunas cosas y mostrar esta aplicacion.

# Caracteristicas

## Front end:
- Diseño acorde con la tematica 
- manejo del paginado 
- manejo del filtrado 
- manedo del ordenamiento
- formularios controlados

## Back end
- Manejo de variables de entorno
- Deploy en internet
- Funciones modularizadas

# Deploy

https://pi-food-main-alpha.vercel.app/

# Tecnologías Utilizadas

- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres
- [ ] Styled Components
- [ ] Axios

# Notas 🗒️

Para desplegar la aplicacion de forma local es necesario:

- Clonar el repositorio
- Instalar las dependencias de la carpeta Client y Api 
- Para hacer funcionar la API
  - La base de datos esta desplegada en postgreSQL, hay que crear una db en la consola con el nombre food
  - Crear un archivo con el nombre .env donde se guardaran las variables de entorno
    Los nombres son los siguientes:
    
    ```
    DB_USER: {Nombre de usuario}
    DB_PASSWORD: {contraseña}
    DB_HOST: localhost
    DB_NAME: food
    ```
  - en la consola de la carpeta Api despues de haber instalado las dependencias ejecutar el comando npm start
- Para hacer funcionar el Cliente  
  - Agregar un archivo .env.local dentro de la carpeta Client con lo siguiente:
  
    ```
    REACT_APP_URL_API=http://localhost:3001
    ```
  - Despues de haber instalado las dependencias ejecutar el comando npm start  
