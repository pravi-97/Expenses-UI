import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import "./styles/Home.css";
const Home = () => {

  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    axios
      .get(`${API_URL}ping`)
      .then((response) => {
        console.log(response.statusText);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div id="home-page">
      <div className="container">
        <div className="row">
          <Link className="col-md-3 sections" id="add-new" to="/add">
            <p>Add new Expense</p>
            <i id="add-exp-plus" className="fa-solid fa-plus sections-i"></i>
          </Link>
          {/* <i class="fa-solid fa-chart-simple"></i> */}
          <Link className="col-md-3 sections" id="all-expense" to="/expense">
            <p>Show All Expense</p>
            <i id="add-exp-coins" className="fa-solid fa-coins sections-i"></i>
          </Link>
          <Link className="col-md-3 sections" id="details" to="/detailed">
            <p>Details</p>
            <i id="add-exp-details" className="fa-solid fa-chart-simple sections-i"></i>
          </Link>
          <Link className="col-md-3 sections" id="by-month" to="/month">
            <p>Show Expense by Month</p>
            <i id="add-exp-calendar" className="fa-solid fa-calendar-days sections-i"></i>
          </Link>
          <Link className="col-md-3 sections" id="by-tag" to="/tag">
            <p>Show Expense by Tag</p>
            <i id="add-exp-tag" className="fa-solid fa-tags sections-i"></i>
          </Link>
          <Link className="col-md-3 sections" id="budgets" to="/budgets">
            <p>Budgets</p>
            <i id="add-exp-budgets" className="fa-solid fa-money-bill-trend-up sections-i"></i>
          </Link>
          <Link className="col-md-3 sections" id="question" to="/help">
            <p>Help</p>
            <i id="add-exp-help" className="fa-solid fa-question sections-i"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
