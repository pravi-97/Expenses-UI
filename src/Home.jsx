import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import "./styles/Home.css";
const Home = () => {

  const API_URL = "https://expensetracker-lhsl.onrender.com/";
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
    <>
      <div className="container">
        <div className="row">
          <Link className="col-md-4" id="add-new" to="/add">
            <p>Add new Expense</p>
            <i id="add-exp-plus" className="fa-solid fa-plus"></i>
          </Link>
          {/* <i class="fa-solid fa-chart-simple"></i> */}
          <Link className="col-md-4" id="all-expense" to="/expense">
            <p>Show All Expense</p>
            <i id="add-exp-coins" className="fa-solid fa-coins"></i>
          </Link>
          <Link className="col-md-4" id="details" to="#">
            <p>Details</p>
            <i id="add-exp-details" className="fa-solid fa-chart-simple"></i>
          </Link>
          <Link className="col-md-4" id="by-month" to="/month">
            <p>Show Expense by Month</p>
            <i id="add-exp-calendar" className="fa-solid fa-calendar-days"></i>
          </Link>
          <Link className="col-md-4" id="by-tag" to="/tag">
            <p>Show Expense by Tag</p>
            <i id="add-exp-tag" className="fa-solid fa-tags"></i>
          </Link>
          <Link className="col-md-4" id="question" to="#">
            <p>Help</p>
            <i id="add-exp-help" className="fa-solid fa-question"></i>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
