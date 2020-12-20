import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import "./styles/index.scss";
import Auth0ProviderWithHistory  from "./auth0-provider-with-history.js";

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
