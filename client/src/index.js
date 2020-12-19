import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import "./styles/index.scss";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="kabyldorado.us.auth0.com"
    clientId="YGFdXA07mJmG4LiZlGn4xTQB6G0cuL4X"
    redirectUri={`${window.location.origin}/resolutions`}
  >
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Auth0Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
