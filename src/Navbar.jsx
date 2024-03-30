import { Link } from "react-router-dom";
const Navbar = () => {
    return (
      <>
        <span className="navbar-home">
          <Link to="/">
            HOME
          </Link>
        </span>
      </>
    );
}
export default Navbar;