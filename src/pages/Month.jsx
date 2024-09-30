import { useEffect, useState } from "react";
import axios from "axios";
import { AgChartsReact } from "ag-charts-react";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./Loader";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Month = () => {
  const [data, setData] = useState([]) 
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
        // setOptions({ ...options, data: response.data });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {   
      return (
        <div className="custom-tooltip">
          <p className="line_1" style={{backgroundColor:payload[0].color}}>{`Month and Year : ${payload[0].payload.formatted_date}`}</p>
          <p className="line_2">{`Total Expense : $${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {isLoading ? <div><Loader /></div> : (<div className="container" style={{height:"100vh"}}>
        <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="formatted_date" />
          <YAxis dataKey="price" />
          <Tooltip content={<CustomTooltip />}/>
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
      </div>)}
    </div>
  );
};

export default Month;
