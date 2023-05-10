import "./App.css";
import { Route, Switch } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { RecipeDetail } from "./components/RecipeDetails/RecipeDetails";
import { CreateRecipe } from "./components/CreateRecipe/CreateRecipe";
import MyRecipes from "./components/MyRecipes/MyRecipes";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/">
          <Navbar />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/createRecipe">
          <CreateRecipe />
        </Route>
        <Route exact path="/myRecipes">
          <MyRecipes />
        </Route>

        {/* dejar la ruta de id al ultimo siempre!!!!!!! */}
        <Route exact path="/recipes/:id">
          <RecipeDetail />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
