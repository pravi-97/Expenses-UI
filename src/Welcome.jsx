import AuthLogin from './components/authLogin';
import "./styles/Welcome.css";

const WelcomePage = () => {
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