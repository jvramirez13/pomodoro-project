import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Timer from "./Timer.js";
import History from "./History.js";
import Welcome from "./Welcome.js";
import Home from "./Home.js";
import "./App.css";
import Graph from "./Graph.js";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Timer" component={Timer} />
        <Route exact path="/History" component={History} />
        <Route exact path="/Graph" component={Graph} />
      </Router>
    );
  }
}

export default App;
