import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import "./styles/Expenses.css";

const API_URL = "http://127.1.1.0:3000/";
const Expenses = () => {
  const [expenseList, setExpenseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function displayMessage(val){
    alert(val);
  }
  const handleChange = (index, field) => (event) => {
    if (expenseList.length > index && expenseList[index]) {
      const updatedExpenses = [...expenseList];
      updatedExpenses[index][field] = event.target.value;
      setExpenseList(updatedExpenses);
  };
  }
  const saveChange = (index, field) => (event) => {
    axios
      .put(API_URL + `?id=${index}&field=${field}&value=${event.target.value}`)
      .then((response) => {
        // displayMessage("OK");
      })
      .catch((error) => {
        displayMessage(error);
      });
  };
  const deleteRecord = (index) => (event) => {
    if(confirm("Are you sure you want to delete this record")){
      setExpenseList((prevState) => prevState.filter((_, i) => i !== index));
      axios
        .delete(API_URL + index)
        .then((response) => {
          // displayMessage("OK");
        })
        .catch((error) => {
          displayMessage(error);
        });
    }

  };
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        console.log(response.data);
        // setExpenseList(response.data.rows);
        setExpenseList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Date</th>
            <th>Type</th>
            <th>Remarks</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(expenseList) && expenseList.length > 0 ? (
            expenseList.map((expense, index) => (
              <tr key={index} id={index}>
                <td>{index + 1}</td>
                <td>
                  <input
                    className="no-border"
                    type="date"
                    value={expense.date}
                    // onChange={handleChange(expense.id, "date")}
                    // onBlur={saveChange(expense.id, "date")}
                    onChange={handleChange(index, "date")}
                    onBlur={saveChange(index, "date")}
                  />
                </td>
                <td>
                  <input
                    className="no-border"
                    type="text"
                    value={expense.type}
                    // onChange={handleChange(expense.id, "type")}
                    // onBlur={saveChange(expense.id, "type")}
                    onChange={handleChange(index, "type")}
                    onBlur={saveChange(index, "type")}
                  />
                </td>
                <td>
                  <input
                    className="no-border"
                    type="text"
                    value={expense.remarks}
                    // onChange={handleChange(expense.id, "remarks")}
                    // onBlur={saveChange(expense.id, "remarks")}
                    onChange={handleChange(index, "remarks")}
                    onBlur={saveChange(index, "remarks")}
                  />
                </td>
                <td>
                  <input
                    className="no-border"
                    type="number"
                    value={expense.price}
                    // onChange={handleChange(expense.id, "price")}
                    // onBlur={saveChange(expense.id, "price")}
                    onChange={handleChange(index, "price")}
                    onBlur={saveChange(index, "price")}
                  />
                </td>
                <td>
                  <input
                    id="delete-button"
                    type="button"
                    value="Delete"
                    // onClick={deleteRecord(expense.id)}
                    onClick={deleteRecord(index)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <div>No Expenses available.</div>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default Expenses;