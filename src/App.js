import React from "react";
import "./App.scss";
import { Route, Switch } from "react-router-dom";
import Cats from "./pages/Cats/Cats";
import CatDetails from "./pages/CatDetails/CatDetails";
import Shelter from "./pages/Shelter/Shelter";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <div>
      <div className="container">
        <Header />
        <Switch>
          <Route path="/" exact component={Cats} />
          <Route path="/cats/:id" component={CatDetails} />
          <Route path="/shelters/:id" component={Shelter} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
