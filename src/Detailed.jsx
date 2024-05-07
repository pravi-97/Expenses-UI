import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Detailed.css";
import LineChart from "./components/charts/Detailed/Line";
import ChartMain from "./ChartMain";

const Detailed = () => {
  const [detailsData, setDetailsData] = useState(null);
  const expandWindow = (ele) => {
    setDetailsData(ele);
    const element = document.getElementById("all-charts-section");
    element.classList.add("blur");
  };
  const retractWindow = () => {
    setDetailsData(null);
    const element = document.getElementById("all-charts-section");
    element.classList.remove("blur");
  };
  const getTodaysDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const getDateBefore30Days = () => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    const year = thirtyDaysAgo.getFullYear();
    const month = String(thirtyDaysAgo.getMonth() + 1).padStart(2, "0");
    const day = String(thirtyDaysAgo.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [formData, setFormData] = useState({
    fromDate: getDateBefore30Days(),
    toDate: getTodaysDate(),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const fetchData = (e) => {
    console.log("formData.fromDate: ", formData.fromDate);
    console.log("formData.toDate: ", formData.toDate);
  };
  return (
    <>
      <div className="container-fluid" id="detailed-section">
        <div className="row">
          <div className="from-date col-md-3">
            <label htmlFor="fromDate">From</label>
            <input
              type="date"
              name="fromDate"
              id="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
            />
          </div>
          <div className="to-date col-md-3">
            <label htmlFor="toDate">To</label>
            <input
              type="date"
              name="toDate"
              id="toDate"
              value={formData.toDate}
              onChange={handleChange}
            />
          </div>
          <div className="fetch-button col-md-2">
            <br />
            <button
              type="button"
              className="btn btn-primary"
              onClick={fetchData}
            >
              Fetch
            </button>
          </div>
        </div>
      </div>
      <br />
      <ChartMain detailsData={detailsData} />
      <button id="close_button" type="button" onClick={retractWindow}>
        Close
      </button>
      <div className="container-fluid">
        <div className="row" id="all-charts-section">
          <div
            className="col-md-6"
            id="expandable-chart1"
            onClick={(func) => expandWindow(<LineChart />)}
          >
            <LineChart />
          </div>
          <div
            className="col-md-6"
            id="expandable-chart2"
            onClick={(func) => expandWindow(<LineChart />)}
          >
            <a>
              <LineChart />
            </a>
          </div>
          <div
            className="col-md-6"
            id="expandable-chart3"
            onClick={(func) => expandWindow(<LineChart />)}
          >
            <a>
              <LineChart />
            </a>
          </div>
          <div
            className="col-md-6"
            id="expandable-chart4"
            onClick={(func) => expandWindow(<LineChart />)}
          >
            <a>
              <LineChart />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detailed;
