import * as React from "react";
import { render } from "react-dom";
import MainNav from "./components/MainNav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./views/Home";
import ListPlayers from "./views/players/ListPlayers";
import CreatePlayer from "./views/players/CreatePlayer";
import ListMatches from "./views/matches/ListMatches";
import PredictMatch from "./views/matches/PredictMatch";
import SubmitMatch from "./views/matches/SubmitMatch";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

function App() {
  return (
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
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
