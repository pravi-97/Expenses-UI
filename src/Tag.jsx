import React, { useEffect, useState } from "react";
import axios from "axios";
import { AgChartsReact } from "ag-charts-react";
import "./styles/Tag.css";


const Tag = () => {
  const API_URL = "http://127.1.1.0:3000/";
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState({
    title: {
      text: "Total Expense",
    },
    series: [
      {
        type: "pie",
        angleKey: "total_price",
        legendItemKey: "type",
        // type: "bar",
        // xKey: "total_price",
        // yKey: "type",
        // yName: "Sweaters Made",
        // tooltip: {
        //   renderer,
        //   interaction: {
        //     enabled: true,
        //   },
        // },
      },
    ],
    background: {
      fill: "transparent",
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}tag`);
        // console.log(JSON.parse(response));
        setOptions({ ...options, data: response.data }); 
        console.log(options);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData();
  }, []);
  return (
    <div id="main-chart">
      {isLoading ? (
        <p>Loading data...</p> 
      ) : (
        <AgChartsReact options={options} /> 
      )}
    </div>
  );
};

export default Tag;
