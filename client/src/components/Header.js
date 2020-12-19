import React, { Component } from 'react';
import LoginButton from "./loginbutton";



export class Header extends Component {
  render() {
    return (
      <header>
        
        <section className="summury-header container">
          <h2>New Year's Resolution Keeper!</h2>
          <h6><span className="intro-text">New Year's Resolution Keeper is the perfect tool to help you work on keeping all the promises made at every beginning of the year, most ofen broken. <br /> to Start! Click on 
          <strong>
              <LoginButton/>
          </strong> 
          </span></h6>
        </section>
        
      </header>
    );
  }
}
export default Header;