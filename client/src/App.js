import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from 'react-bootstrap/Spinner'
import "./App.css";
import NavDropdown from 'react-bootstrap/NavDropdown'

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import AddResolution from "./components/add-resolution.component";
import Resolution from "./components/resolution.component";
import ResolutionsList from "./components/resolutions-list.component";


import logo from "./assets/logo.png";



class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }
  render() {
    
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    const handleSelect = (eventKey) => alert(`selected ${eventKey}`);
    
    
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          
          <div className="navbar-nav">
            

          {currentUser && (
              <li className="nav-item">
                
                
                <NavDropdown title="Menu" id="nav-dropdown">
                  <Spinner className="loading-spinner" animation="border" variant="primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                  <Spinner className="loading-spinner" animation="border" variant="success" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                  <Spinner className="loading-spinner" animation="border" variant="warning" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                  <Spinner className="loading-spinner" animation="border" variant="danger" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                  <Spinner className="loading-spinner" animation="border" variant="dark" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                  <NavDropdown.Item eventKey="4.1">
                    <Link to={"/user"} className="nav-link">
                      User
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.2">
                    <Link to={"/resolutions"} className="nav-link">
                      My List
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.3">
                    <Link to={"/add"} className="nav-link">
                      Add
                    </Link>
                  </NavDropdown.Item>
                  
                  <NavDropdown.Item eventKey="4.4">
                  <Link to={"/add"} className="nav-link">
                      Random
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item eventkey="4.5">
                    <Link to={"/profile"} className="nav-link">
                      Profile
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <div className="logo">
                    <img className="img-logo" src={logo} alt="React logo" />
                  </div>
                  
                </NavDropdown>
              </li>
              
            )}
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            
            
            
          </div>
          
          <Link to={"/"} className="navbar-brand">
            <h1>RESOLUTIONS KEEPER</h1>
          </Link>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
              
            </div>
          )}
        </nav>
        <div id="my-background" className="background">
          <div id="stars" />
          <div id="stars2" />
          <div id="stars3" />
        </div>
       

        <div className="container mt-5">
          <Switch>
            
            <Route exact path="/resolutions" component={ResolutionsList} />
            <Route exact path="/add" component={AddResolution} />
            <Route path="/resolutions/:id" component={Resolution} />
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            
          </Switch>
          
        </div>
        
  
      </div>
      
    );
  }
}

export default App;
