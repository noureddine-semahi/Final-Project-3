import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddResolution from "./components/add-resolution.component";
import Resolution from "./components/resolution.component";
import ResolutionsList from "./components/resolutions-list.component";
import LandingPage from "./components/landingpage.component";
import LoginButton from "./components/loginbutton";
import LogoutButton from "./components/logoutbutton";
//import { useAuth0 } from "@auth0/auth0-react";


class App extends Component {
  render() {
    //const { isAuthenticated } = useAuth0();
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Resolutions Keeper
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/resolutions"} className="nav-link">
                My Resolutions
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add new Resolutions
              </Link>
            </li>
            <li className="nav-item">
            
              <LogoutButton />
              
              <LoginButton />
            
              
            </li>
          </div>
        </nav>

        <div className="container mt-5">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/resolutions" component={ResolutionsList} />
            <Route exact path="/add" component={AddResolution} />
            <Route path="/resolutions/:id" component={Resolution} />
          </Switch>
        </div>
      </div>
      
    );
  }
}

export default App;
