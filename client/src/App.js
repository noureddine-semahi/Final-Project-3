import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddResolution from "./components/add-resolution.component";
import Resolution from "./components/resolution.component";
import ResolutionsList from "./components/resolutions-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/resolutions"} className="navbar-brand">
            My New Year's Resolutions
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/resolutions"} className="nav-link">
                My Goals
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/resolutions"]} component={ResolutionsList} />
            <Route exact path="/add" component={AddResolution} />
            <Route path="/resolutions/:id" component={Resolution} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
