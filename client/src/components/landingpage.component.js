import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

import LoginButton from "./loginbutton";
import Header from './Header';
import WOW from "wowjs";

export default class LandingPage extends React.Component {
	componentDidMount() {
		new WOW.WOW().init();
	}

	render() {
		return (
			<div className="home-page">
        		<Header />
				
        		
			</div>
		);
	}
}

LandingPage.propTypes = {
	aboutRef: PropTypes.object,
	bounceIn: PropTypes.string
};