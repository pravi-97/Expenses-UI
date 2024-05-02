import AuthLogin from './components/authLogin';
import { useEffect } from "react";
import axios from "axios";
import "./styles/Welcome.css";

const WelcomePage = () => {
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
      <div className="container">
        <main className="welcome-content">
          <h1>Welcome to Expenses!</h1>
          <p>Start tracking your expenses today!</p>
          <button className="login-button">
            <AuthLogin />
          </button>
        </main>
      </div>
    );
};

export default WelcomePage;