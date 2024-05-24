import { useEffect, useState } from "react";
import axios from "axios";
import { AgChartsReact } from "ag-charts-react";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./Loader";

const Month = () => {
  const { user } = useAuth0();
  const API_URL = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${API_URL}month?userid=${user.sub.replace("auth0|", "")}`
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

  const [options, setOptions] = useState({
    title: {
      text: "Monthly Expenses",
    },
    series: [
      {
        type: "line",
        xKey: "formatted_date",
        yKey: "price",
        yName: "Month and Year",
      },
    ],
    background: {
      fill: "transparent",
    },
  });
  return (
    <div>
      {isLoading ? <div><Loader/></div> : <AgChartsReact options={options} />}
    </div>
  );
};

export default Month;
