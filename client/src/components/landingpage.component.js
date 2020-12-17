import React from "react";
import PropTypes from "prop-types";

import WOW from "wowjs";

export default class LandingPage extends React.Component {
	componentDidMount() {
		new WOW.WOW().init();
	}

	render() {
		return (
			<div id="my-background" className="background">
				<div id="stars" />
				<div id="stars2" />
				<div id="stars3" />
				<div className="top-container flex">
					<h2>
						Welcome to New Year's
                        <br></br>
                        Resolutions Keeper !
					</h2>
					{/* offset can be cahnged in node modules wowjs default file */}
					
				</div>
			</div>
		);
	}
}

LandingPage.propTypes = {
	aboutRef: PropTypes.object,
	bounceIn: PropTypes.string
};