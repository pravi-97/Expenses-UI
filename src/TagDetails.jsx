import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./Loader";

const TagDetails = ({ detailsData }) => {
  const { user } = useAuth0();
  const API_URL = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [expenseList, setExpenseList] = useState([]);
  let url = "";
  useEffect(() => {
    if (detailsData.monthyear == undefined || detailsData.monthyear == "") {
      url = `${API_URL}tag/${detailsData.tag}?userid=${user.sub.replace("auth0|", "")}`;
    } else {
      url = `${API_URL}tag/${detailsData.tag}?monthyear=${detailsData.monthyear}&userid=${user.sub.replace("auth0|", "")}`;
    }
    if (detailsData.tag != "") {
      setIsLoading(true);
      axios
        .get(url)
        .then((response) => {
          setExpenseList(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          // setError(error);
          setIsLoading(false);
        });
    }
  }, [detailsData]);

  return (
    <div id="detail-type">
      <div className="list-heading">
        Expense for Type: <span>{detailsData.tag}</span>
      </div>
      {isLoading ? (
        <div><Loader/></div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Date</th>
              <th>Remarks</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(expenseList) && expenseList.length > 0 ? (
              expenseList.map((expense, index) => (
                <tr key={index} id={index}>
                  <td>{index + 1}</td>
                  <td>{expense.date}</td>
                  <td>{expense.remarks}</td>
                  <td>{expense.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No Expenses available.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TagDetails;
