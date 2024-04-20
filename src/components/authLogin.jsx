import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/Auth.css'

const AuthLogin = () => {
  const { loginWithRedirect } = useAuth0();

  return <div className="auth-button" onClick={() => loginWithRedirect()}>Log In</div>;
};

export default AuthLogin;