import { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "/src/Loader";
import axios from "axios";
const Bar = () => {
  const API_URL = "https://expensetracker-lhsl.onrender.com/";
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
        // yName: "remarks",
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
          `${API_URL}all?userid=${user.sub.replace("auth0|", "")}`
        );
        setOptions({ ...options, data: response.data });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

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
