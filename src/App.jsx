import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Add from "./Add"
import Expenses from "./Expenses";
import Month from "./Month";
import Tag from "./Tag";
import Detailed from "./Detailed";
import Error from "./Error";
import "./styles/App.css"

function App() {
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
