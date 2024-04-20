import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthLogout = () => {
  const { logout } = useAuth0();

  return (
    <div
      className="auth-button"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </div>
  );
};

export default AuthLogout;
