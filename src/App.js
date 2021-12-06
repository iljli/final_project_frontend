/*
Installed packages:

npm install --save echarts-for-react
npm install echarts-for-react

*/


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
import UserManagement from "./components/CreateUser";
import ListSensors from "./components/ListSensors";
import Graph from "./components/Graph"
import CreateSensor from "./components/CreateSensor"
import { useUserContext } from "./context/UserContext";


function App() {
  const { userData: loggedInUser } = useUserContext();

  // console.log(loggedInUser);

  return (
    <div className="main">

      <Header />
      Logged in user: {loggedInUser?.username}
      <br />
      Logged in user: {loggedInUser?._id}

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

        <Route exact path="/graph/:_id">
          <Graph />
        </Route>

        <Route exact path="/createSensor">
          <CreateSensor />
        </Route>

      </Switch>

      <Footer />
    </div>
  );
}

export default App;
