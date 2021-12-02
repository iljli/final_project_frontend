import logo from "./logo.svg";
import "./App.css";
import react from "react";
import M from "materialize-css";
import { Switch, Route, Link, NavLink } from "react-router-dom";
import Landing from "./components/LandingPage";
import Contacts from "./components/contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/login";
import UserManagement from "./components/UserManagement";
import ListSensors from "./components/ListSensors";

function App() {







  return (
    <div className="main">
      <Header />

      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/userManagement">
          <UserManagement />
        </Route>

        <Route exact path="/contacts">
          <Contacts />
        </Route>

        <Route exact path="/listSensors">
          <ListSensors />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
