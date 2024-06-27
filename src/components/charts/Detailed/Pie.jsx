import { useEffect, useState } from "react";
import axios from "axios";
import { AgChartsReact } from "ag-charts-react";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "/src/Loader";
const Pie = ({ formData }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
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
      try {
        const response = await axios.get(
          `${API_URL}group?fromdate=${formData.fromDate}&todate=${
            formData.toDate
          }&userid=${user.sub.replace("auth0|", "")}`
        );
        setOptions({ ...options, data: response.data.sum });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [formData]);

  function renderer(params) {
    return `<div class="ag-chart-tooltip-title" style="background-color: ${
      params.color
    }">
    <div id="tooltip-hover" class="tooltip-hover" title="Click to View Details.">
      ${params.datum[params.angleName]}
      </div>
    </div>
    <div class="ag-chart-tooltip-content">
      Total: 
        ${params.datum[params.angleKey]}
      
    </div>`;
  }

  return (
    <div>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="container">
          <AgChartsReact options={options} />
        </div>
      )}
    </div>
  );
};

export default Pie;