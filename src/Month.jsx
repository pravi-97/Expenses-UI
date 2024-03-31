import {useEffect, useState } from "react";
import axios from "axios";
import { AgChartsReact } from "ag-charts-react";

const Month = () => {
    const API_URL = "http://127.1.1.0:3000/";
    const [isLoading, setIsLoading] = useState(false);
    const [expenseList, setExpenseList] = useState([]);
    
    useEffect(() => {
        setIsLoading(true);
        axios
          .get(`${API_URL}month`)
          .then((response) => {
            console.log(response);
            setExpenseList(response.data);
            setIsLoading(false);
            setOptions[{ ...options, data: response.data }];
          })
          .catch((error) => {
            // setError(error);
            setIsLoading(false);
          });
    },[]);
    function getData() {
      return [
        {
          quarter: "Q1",
          petrol: 200,
          honey: 100,
        },
        {
          quarter: "Q2",
          petrol: 300,
          diesel: 130,
        },
        {
          quarter: "Q3",
          petrol: 350,
          diesel: 160,
          honey: 200,
        },
        {
          quarter: "Q4",
          petrol: 400,
          diesel: 200,
          honey: 400,
        },
      ];
    }

  const [options, setOptions] = useState({
    title: {
      text: "Annual Fuel Expenditure",
    },
    // data: getData(),
    series: [
      {
        type: "line",
        xKey: "month",
        yKey: "total_price",
        yName: "Petrol",
      },
      {
        type: "line",
        xKey: "quarter",
        yKey: "diesel",
        yName: "Diesel",
      },
      {
        type: "line",
        xKey: "quarter",
        yKey: "honey",
        yName: "Honey",
      },
    ],
  });

  return <AgChartsReact options={options} />;
};

export default Month;