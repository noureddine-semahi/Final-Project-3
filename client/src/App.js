import React, { Component } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddResolution from "./components/add-resolution.component";
import Resolution from "./components/resolution.component";
import ResolutionsList from "./components/resolutions-list.component";
import LandingPage from "./components/landingpage.component";
import Random from "./components/random";
import LogoutButton from "./components/logoutbutton";
import logo from "./assets/logo.png";
import Footer from './components/Footer';
//import { useAuth0 } from "@auth0/auth0-react";


class App extends Component {
  render() {
    //const { isAuthenticated } = useAuth0();
    const { location } = this.props;
    
    return (
      <div>
        {location.pathname !== "/" && 
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <img className="mb-3 app-logo" src={logo} alt="React logo" width="90" />
          <Link to={"/"} className="navbar-brand">
            Resolutions Keeper
          </Link>
          
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/resolutions"} className="nav-link">
                My List
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/random"} className="nav-link">
                Random
              </Link>
            </li>
            <li className="nav-item">
            
              <LogoutButton />
              
              {/* <LoginButton /> */}
            
              
            </li>
          </div>
        </nav>
        }<div id="my-background" className="background">
          <div id="stars" />
          <div id="stars2" />
          <div id="stars3" />
          <Footer />
        </div>
       

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

export default withRouter(App);
