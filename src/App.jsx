import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Add from "./Add";
import Expenses from "./Expenses";
import Month from "./Month";
import Tag from "./Tag";
import Detailed from "./Detailed";
import Error from "./Error";
import Welcome from "./Welcome";
import "./styles/App.css";
import { useAuth0 } from "@auth0/auth0-react";
import AuthLogin from "./components/authLogin";
import AuthProfile from "./components/authProfile";
import AuthLogout from "./components/AuthLogout";

function App() {
  const { isLoading, error, isAuthenticated } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Navbar />
        <Welcome/>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/add" element={<Add />} />
        <Route path="/expense" element={<Expenses />} />
        <Route path="/month" element={<Month />} />
        <Route path="/tag" element={<Tag />} />
        <Route path="/detailed" element={<Detailed />} />
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      {/* <Social /> */}
    </BrowserRouter>
  );
}

export default App;
