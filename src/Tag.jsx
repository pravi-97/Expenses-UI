import React, { useEffect, useState } from "react";
import axios from "axios";
import { AgChartsReact } from "ag-charts-react";
import TagDetails from "./TagDetails";
import "./styles/Tag.css";

const Tag = () => {
  const [detailsData, setDetailsData] = useState({});

  useEffect(() => {
    const getDetails = (event) => {
      if (event.target.matches("#tooltip-hover")) {
        setDetailsData({...detailsData, tag: event.target.textContent.trim() });
        // setDetailsData(event.target.textContent);
      }
    };

    document.addEventListener("click", getDetails);

    return () => {
      document.removeEventListener("click", getDetails);
    };
  }, []);

  const changedDropdown = async (event) => {
    console.log(event.target.value);
    setDetailsData({...detailsData, monthyear: event.target.value.trim() });
  setIsLoading(true);
      try {
        const response = await axios.get(
          `${API_URL}monthly?month=${event.target.value.substring(
            0,
            1
          )}&year=${event.target.value.substring(2, 6)}`
        );
        console.log(response);
        setOptions({ ...options, data: response.data });
        // setDateDate(response.data.date);
        // console.log(dateData);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
  }
  function renderer(params) {
    return `<div class="ag-chart-tooltip-title" style="background-color: ${
      params.color
    }">
    <a id="tooltip-hover" class="tooltip-hover" title="Click to View Details." href="#">
      ${params.datum[params.angleName]}
      </a>
    </div>
    <div class="ag-chart-tooltip-content">
      Total: 
        ${params.datum[params.angleKey]}
      
    </div>`;
  }

  const API_URL = "http://127.1.1.0:3000/";
  const [dateData, setDateDate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSelect, setIsLoadingSelect] = useState(false);
  const [options, setOptions] = useState({
    title: {
      text: "Total Expense",
    },
    series: [
      {
        type: "pie",
        angleKey: "total_price",
        angleName: "type",
        legendItemKey: "type",
        // calloutLabelKey: "type",
        // calloutLabelName: "total_price",
        // sectorLabelKey: "total_price",
        // sectorLabelName: "total_price",
        tooltip: {
          renderer,
          interaction: {
            enabled: true,
          },
        },
      },
    ],
    background: {
      fill: "transparent",
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsLoadingSelect(true);
      try {
        const response = await axios.get(`${API_URL}group`);
        setOptions({ ...options, data: response.data.sum });
        setDateDate(response.data.date);
        // console.log(dateData);
        // console.log(response.data.date);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
        setIsLoadingSelect(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div id="main-chart">
      <div id="select-date">
        {isLoadingSelect ? (
          <select name="cars" id="cars">
            <option value="">Not Available</option>
          </select>
        ) : (
          <select name="dd-mm" id="dd-mm" onChange={changedDropdown}>
            <option value="-"></option>
            {Array.isArray(dateData) && dateData.length > 0 ? (
              dateData.map((date, index) => (
                <option key={index} value={`${date.mm}-${date.year}`}>
                  {date.mmmm}
                  {date.year}
                </option>
              ))
            ) : (
              <div>No Expenses available.</div>
            )}
          </select>
        )}
      </div>
      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        <span className="container">
          <span className="row">
            <span className="col-md-8 p-0">
              <AgChartsReact options={options} />
            </span>
            <span className="col-md-4 p-0">
              <TagDetails detailsData={detailsData} />
            </span>
          </span>
        </span>
      )}
    </div>
  );
};

export default Tag;
