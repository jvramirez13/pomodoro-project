import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Timer from "./Timer.js";
import History from "./History.js";
import Welcome from "./Welcome.js";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/Timer" component={Timer} />
        <Route exact path="/History" component={History} />
      </Router>
    );
  }
}

export default App;
