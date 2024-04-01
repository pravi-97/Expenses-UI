import { Link } from "react-router-dom";
import "./styles/Home.css";
const Home = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <Link className="col-md-6" id="add-new" to="/add">
            Add new Expense
          </Link>
          <Link className="col-md-6" id="all-expense" to="/expense">
            Show All Expense
          </Link>
          <Link className="col-md-6" id="by-month" to="/month">
            Show Expense by Month
          </Link>
          <Link className="col-md-6" id="by-tag" to="/tag">
            Show Expense by Tag
          </Link>
          {/* <Link className="col-md-6" to="/detailed">
              Show Detailed Expense by Month
            </Link>
            */}
        </div>
      </div>
    </>
  );
};

export default Home;
