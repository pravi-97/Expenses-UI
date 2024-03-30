import { useEffect, useState } from "react";
import axios from "axios";

const TagDetails = ({ detailsData }) => {
  const API_URL = "http://127.1.1.0:3000/";
  const [isLoading, setIsLoading] = useState(false);
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    console.log(detailsData);
    if (detailsData.tag != "") {
        setIsLoading(true);
      axios
        .get(`${API_URL}tag/${detailsData.tag}`)
        .then((response) => {
            console.log(response.data);
          setExpenseList(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }
  }, [detailsData]);

  return (
    <div id="detail-type">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
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
                  <div>No Expenses available.</div>
                )}
              </tbody>
            </table>
          </div>
      )}
    </div>
  );
};

export default TagDetails;
