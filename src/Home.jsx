import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Link className="navbar-brand" to="/add">
              Add new Expense
            </Link>
          </div>
          <div className="col-md-6">
            <Link className="navbar-brand" to="/expense">
              Show All Expense
            </Link>
          </div>
          <div className="col-md-6">
            <Link className="navbar-brand" to="/month">
              Show Expense by Month
            </Link>
          </div>
          <div className="col-md-6">
            <Link className="navbar-brand" to="/tag">
              Show Expense by Tag
            </Link>
          </div>
          <div className="col-md-6">
            <Link className="navbar-brand" to="/detailed">
              Show Detailed Expense by Month
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
