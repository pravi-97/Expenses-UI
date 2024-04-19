import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthLogout = () => {
  const { logout } = useAuth0();

  return (
    <button
      style={{ backgroundColor: "black", color: "white" }}
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </button>
  );
};

export default AuthLogout;
