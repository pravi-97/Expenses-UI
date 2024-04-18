import { Link } from "react-router-dom";
import AuthLogin from "./components/authLogin";
import AuthProfile from "./components/authProfile";
import AuthLogout from "./components/AuthLogout";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const {user, isLoading, error, isAuthenticated } = useAuth0();
  // console.log(user);
  return (
    <>
      <span className="navbar-home">
        <Link to="/">HOME</Link>
        {!isAuthenticated ? <AuthLogin /> : <AuthLogout />}
      </span>
    </>
  );
};
export default Navbar;
