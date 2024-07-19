import { Link } from "react-router-dom";
import AuthLogout from "../components/AuthLogout";
import { useAuth0 } from "@auth0/auth0-react";
import './styles/Navbar.css'

const Navbar = () => {
  const {user} = useAuth0();
  return (
    <nav className="navbar-home">
      <Link className="home-button" to="/">
        HOME
      </Link>
      <span className="right-side">
        <span className="welcome-msg">Hello {user.nickname}</span>
        <button className="login-button">
          <AuthLogout />
        </button>
      </span>
    </nav>
  );
};
export default Navbar;
