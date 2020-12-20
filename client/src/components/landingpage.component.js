import React from "react";
import PropTypes from "prop-types";


import Header from './Header';
import Footer from './Footer';
import WOW from "wowjs";

export default class LandingPage extends React.Component {
	componentDidMount() {
		new WOW.WOW().init();
	}

	render() {
		return (
			<div className="home-page">
        		<Header />
				
        		<Footer />
			</div>
		);
	}
}

LandingPage.propTypes = {
	aboutRef: PropTypes.object,
	bounceIn: PropTypes.string
};