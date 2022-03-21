import React from "react";
import "./App.scss";
import { Route, Switch } from "react-router-dom";
import catIcon from "./assets/icons/cat.png";
import Cats from "./pages/Cats/Cats";
// import CatsDetails from "./pages/CatsDetails/CatsDetails";

function App() {
  return (
    <div>
      <div className="container">
        <img src={catIcon} alt="" width="50" height="50" />
        <p>meowdopt</p>

        <Switch>
          <Route path="/" exact component={Cats} />
          {/* <Route path="/cats/:id" component={CatsDetails} /> */}
          {/* <Route path="/shelter" component={Shelter} /> */}
        </Switch>
      </div>
    </div>
  );
}

export default App;
