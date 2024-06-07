import { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "/src/Loader";
import axios from "axios";
const Bar = ({ formData }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState({
    title: {
      text: "Daily Expense",
    },
    subtitle: {
      text: "In Rupee",
    },
    series: [
      {
        type: "bar",
        xKey: "date",
        yKey: "price",
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
          `${API_URL}all?fromdate=${formData.fromDate}&todate=${
            formData.toDate
          }&userid=${user.sub.replace("auth0|", "")}`
        );
        // console.log(response.data);
        setOptions({ ...options, data: response.data });
        console.log("Bar options: ",options);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    // fetchData();
  }, [formData]);

  return (
    <div>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <AgChartsReact options={options} />
      )}
    </div>
  );
};

export default Bar;
