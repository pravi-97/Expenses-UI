import React, { useEffect, useState } from "react";
import axios from "axios";
import { AgChartsReact } from "ag-charts-react";
import { useAuth0 } from "@auth0/auth0-react";
import TagDetails from "./TagDetails";
import Loader from "./Loader";
import "./styles/Tag.css";

const Tag = () => {
  const [detailsData, setDetailsData] = useState({});
  const { user } = useAuth0();
  useEffect(() => {
    const getDetails = (event) => {
      if (event.target.matches("#tooltip-hover")) {
        setDetailsData((prevState) => ({
          ...prevState,
          tag: event.target.textContent.trim(),
        }));
      }
    };
    document.addEventListener("click", getDetails);

    return () => {
      document.removeEventListener("click", getDetails);
    };
  }, []);

  const changedDropdown = async (event) => {
    const monthYearValue = event.target.value.trim();
    setDetailsData({ tag: detailsData.tag, monthyear: monthYearValue });
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}monthly?month=${monthYearValue.substring(
          0,
          2
        )}&year=${monthYearValue.substring(3, 7)}&userid=${user.sub.replace("auth0|", "")}`,
      );
      setOptions({ ...options, data: response.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const API_URL = import.meta.env.VITE_API_URL;
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
        const response = await axios.get(
          `${API_URL}group?userid=${user.sub.replace("auth0|", "")}`
        );
        setOptions({ ...options, data: response.data.sum });
        setDateDate(response.data.date);
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
        <div id="select-date-text"> Filter by Month & Year</div>
        {isLoadingSelect ? (
          <select name="expense" id="expense">
            <option value="">Not Available</option>
          </select>
        ) : (
          <select name="dd-mm" id="dd-mm" onChange={changedDropdown}>
            <option value=""></option>
            {Array.isArray(dateData) && dateData.length > 0 ? (
              dateData.map((date, index) => (
                <option key={index} value={`${date.mm}-${date.year}`}>
                  {date.mmmm} {date.year}
                </option>
              ))
            ) : (
              <option>No Expenses available.</option>
            )}
          </select>
        )}
      </div>
      {isLoading ? (
        <span className="container">
          <span className="row">
            <span className="col-md-8 p-0">
              <Loader />
            </span>
            <span className="col-md-4 p-0"></span>
          </span>
        </span>
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
