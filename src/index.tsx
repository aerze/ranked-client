import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { bindActionCreators } from "redux";
import store from "store/store";
import MainNav from "./components/MainNav";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Home from "./views/Home";
import Top from "./views/Top";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import ListPlayers from "./views/players/ListPlayers";
import CreatePlayer from "./views/players/CreatePlayer";
import ListMatches from "./views/matches/ListMatches";
import PredictMatch from "./views/matches/PredictMatch";
import SubmitMatch from "./views/matches/SubmitMatch";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { logout } from "store/reducers/authentication";
import setupAxios from "config/axios-config";

const actions = bindActionCreators({ logout }, store.dispatch);
setupAxios(() => actions.logout());

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <MainNav />
          <Switch>
            <Route exact path="/players">
              <ListPlayers />
            </Route>
            <Route exact path="/players/create">
              <CreatePlayer />
            </Route>

            <Route exact path="/matches/history">
              <ListMatches />
            </Route>
            <Route exact path="/matches/predict">
              <PredictMatch />
            </Route>
            <Route exact path="/matches/submit">
              <SubmitMatch />
            </Route>
            <Route exact path="/auth/login">
              <Login />
            </Route>
            <Route exact path="/auth/register">
              <Register />
            </Route>
            <Route exact path="/top">
              <Top />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Redirect to="/login" />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
