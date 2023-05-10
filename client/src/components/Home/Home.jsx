import React from "react";
import Recipes from "../Recipes/Recipes";
import Search from "../Search/Search";

export default function Home(props) {
  return (
    <div>
      <Search />
      <Recipes />
    </div>
  );
}
