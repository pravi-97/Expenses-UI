import { useState } from "react";
import "./styles/Detailed.css";
import ChartMain from "./ChartMain";
import Line from "../components/charts/Detailed/Line";
import Pie from "../components/charts/Detailed/Pie";
import Bar from "../components/charts/Detailed/Bar";

const Detailed = () => {
  const [detailsData, setDetailsData] = useState(null);
  const expandWindow = (ele) => {
    setDetailsData(ele);
    const element = document.getElementById("all-charts-section");
    element.classList.add("blur");
    const styleEle = document.getElementById("chart-main-section");
    styleEle.style.zIndex = 10;
    styleEle.style.display = "block";
    const close_button = document.getElementById("close_button");
    close_button.style.display = "block";
  };
  const retractWindow = () => {
    setDetailsData(null);
    const element = document.getElementById("all-charts-section");
    element.classList.remove("blur");
    const styleEle = document.getElementById("chart-main-section");
    styleEle.style.zIndex = 0;
    styleEle.style.display = "none";
    const close_button = document.getElementById("close_button");
    close_button.style.display = "none";
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
        </div>
      </div>
      <ChartMain detailsData={detailsData} />
      <button id="close_button" type="button" className="btn" onClick={retractWindow}>
        Close
      </button>
      <div className="container-fluid" id="">
        <div className="row" id="all-charts-section">
          <div
            className="col-md-4"
            id="expandable-chart1"
            onClick={(func) => expandWindow(<Pie formData={formData} />)}
          >
            <Pie formData={formData} />
          </div>
          <div
            className="col-md-4"
            id="expandable-chart2"
            onClick={(func) => expandWindow(<Bar formData={formData}/>)}
          >
            <a>
              <Bar formData={formData}/>
            </a>
          </div>
          <div
            className="col-md-4"
            id="expandable-chart3"
            onClick={(func) => expandWindow(<Line formData={formData} />)}
          >
            <a>
              <Line formData={formData} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detailed;
