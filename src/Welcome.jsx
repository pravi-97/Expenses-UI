import AuthLogin from './components/authLogin'
import "./styles/Welcome.css";

const WelcomePage = () => {
    return (
      <div className="container">
        <header>
          <button className="login-button">
            <AuthLogin />
          </button>
        </header>
        <main className="welcome-content">
          <h1>Welcome to Expenses!</h1>
          <p>Start tracking your expenses today!</p>
        </main>
      </div>
    );
};

export default WelcomePage;