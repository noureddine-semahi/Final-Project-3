import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button id="Log" onClick={() => loginWithRedirect()}>Sign Up/Login</button>;
};

export default LoginButton;