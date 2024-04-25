import { Link } from "react-router-dom";
import "./styles/Home.css";
const Home = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <Link className="col-md-6" id="add-new" to="/add">
            <p>Add new Expense</p>
            <i
              id="add-exp-plus"
              className="fa-solid fa-plus"
            ></i>
          </Link>
          <Link className="col-md-6" id="all-expense" to="/expense">
            <p>Show All Expense</p>
            <i
              id="add-exp-coins"
              className="fa-solid fa-coins"
            ></i>
          </Link>
          <Link className="col-md-6" id="by-month" to="/month">
            <p>Show Expense by Month</p>
            <i
              id="add-exp-calendar"
              className="fa-solid fa-calendar-days"
            ></i>
          </Link>
          <Link className="col-md-6" id="by-tag" to="/tag">
            <p>Show Expense by Tag</p>
            <i
              id="add-exp-tag"
              className="fa-solid fa-tags"
            ></i>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
