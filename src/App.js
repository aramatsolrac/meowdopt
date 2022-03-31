import React from "react";
import "./App.scss";
import { Route, Switch } from "react-router-dom";
import Cats from "./pages/Cats/Cats";
import CatDetails from "./pages/CatDetails/CatDetails";
import Shelter from "./pages/Shelter/Shelter";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
// import SignUp from "./pages/SignUp/SignUp";
// import SignIn from "./pages/SignIn/SignIn";

import Profile from "./pages/Profile/Profile";
import FavoritesCats from "./pages/FavoritesCats/FavoritesCats";
import RequestsCats from "./pages/RequestsCats/RequestsCats";
import Footer from "./components/Footer/Footer";

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
          {/* <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} /> */}
          <Route path="/profile" component={Profile} />
          <Route path="/:id/favorites" component={FavoritesCats} />
          <Route path="/:id/requests" component={RequestsCats} />
        </Switch>
        <Footer />
      </div>
    </div>
  );
}

export default App;
