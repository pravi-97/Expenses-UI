import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./Navbar";
import Home from "./Home";
import Add from "./Add";
import Expenses from "./Expenses";
import Month from "./Month";
import Tag from "./Tag";
import Detailed from "./Detailed";
import Error from "./Error";
import Welcome from "./Welcome";
import Budgets from "./Budgets";
import Loader from "./Loader";
import "./styles/App.css";
import Help from "./Help";

function App() {
  const { isLoading, error, isAuthenticated } = useAuth0();

  if (error) {
    return (
      <div>
        <Error /> {error.message}
      </div>
    );
  }
  if (isLoading) {
    return <Loader/>;
  }
  if (!isAuthenticated) {
    return (
      <BrowserRouter>
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
        <Route path="/budgets" element={<Budgets/>} />
        <Route path="/help" element={<Help/>} />
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
