import { useEffect, useState } from "react";
import axios from "axios";

const TagDetails = ({ detailsData }) => {
  const API_URL = "http://127.1.1.0:3000/";
  const [isLoading, setIsLoading] = useState(false);
  const [expenseList, setExpenseList] = useState([]);
  let url = "";
  useEffect(() => {
    if (detailsData.monthyear == undefined || detailsData.monthyear == "") {
      url = `${API_URL}tag/${detailsData.tag}`;
    } else {
      url = `${API_URL}tag/${detailsData.tag}?monthyear=${detailsData.monthyear}`;
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
        <div>Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Date</th>
              {/* <th>Type</th> */}
              <th>Remarks</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(expenseList) && expenseList.length > 0 ? (
              expenseList.map((expense, index) => (
                <tr key={index} id={index}>
                  <td>{index + 1}</td>
                  <td>{expense.formatted_date}</td>
                  {/* <td>{expense.type}</td> */}
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
