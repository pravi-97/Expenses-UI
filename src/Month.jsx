import { useEffect, useState } from "react";
import axios from "axios";
import { AgChartsReact } from "ag-charts-react";

const Month = () => {
  const API_URL = "https://expensetracker-lhsl.onrender.com/";
  const [isLoading, setIsLoading] = useState(false);
  // const [expenseList, setExpenseList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}month`);
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
    // data: fetchData(),
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
      {isLoading ? <div>Loading..</div> : <AgChartsReact options={options} />}
    </div>
  );
};

export default Month;
