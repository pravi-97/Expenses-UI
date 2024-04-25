import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./Loader";
import "./styles/Expenses.css";

const API_URL = "https://expensetracker-lhsl.onrender.com/";
const Expenses = () => {
  const { user } = useAuth0();
  const [expenseList, setExpenseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  function displayMessage(val) {
    const message = document.getElementById("message-box");
    
    if (val == "updated") {
      message.textContent = "Update Successfull!";
      message.style.backgroundColor = "greenyellow";
      displayMessageBox();
    }else if(val == "deleted"){
      message.textContent = "Delete Successfull!";
      message.style.backgroundColor = "greenyellow";
      displayMessageBox();
    }else {
      message.textContent = "An Error Occurred!";
      message.style.backgroundColor = "red";
      displayMessageBox();
    }
    function displayMessageBox() {
      message.style.opacity = "1";
      setTimeout(hideMessageBox, 5000);
    }
    function hideMessageBox(){
      message.style.opacity = "0";
    }
  }
  const handleChange = (index, field) => (event) => {
    if (expenseList.length > index && expenseList[index]) {
      const updatedExpenses = [...expenseList];
      updatedExpenses[index][field] = event.target.value;
      setExpenseList(updatedExpenses);
    }
  };
  const saveChange = (index, field) => (event) => {
    axios
      .put(
        API_URL +
          `?id=${expenseList[index].ID}&field=${field}&value=${event.target.value}`
      )
      .then((response) => {
        displayMessage(response.data.message);
      })
      .catch((error) => {
        displayMessage(error);
      });
  };
  const deleteRecord = (index) => (event) => {
    if (confirm("Are you sure you want to delete this record")) {
      setExpenseList((prevState) => prevState.filter((_, i) => i !== index));
      axios
        .delete(API_URL + expenseList[index].ID)
        .then((response) => {
          displayMessage(response.data.message);
        })
        .catch((error) => {
          displayMessage(error);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}all?userid=${user.sub.replace("auth0|", "")}`)
      .then((response) => {
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
    <div className="container" id="message-container">
      <table>
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Date</th>
            <th>Type</th>
            <th>Remarks</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(expenseList) && expenseList.length > 0 ? (
            expenseList.map((expense, index) => (
              <tr key={index} id={index}>
                <td>{index + 1}</td>
                <td>
                  <input
                    name="date"
                    className="no-border"
                    type="date"
                    value={expense.date}
                    onChange={handleChange(index, "date")}
                    onBlur={saveChange(index, "date")}
                  />
                </td>
                <td>
                  <input
                    name="type"
                    className="no-border"
                    type="text"
                    value={expense.type}
                    onChange={handleChange(index, "type")}
                    onBlur={saveChange(index, "type")}
                  />
                </td>
                <td>
                  <input
                    name="remarks"
                    className="no-border"
                    type="text"
                    value={expense.remarks}
                    onChange={handleChange(index, "remarks")}
                    onBlur={saveChange(index, "remarks")}
                  />
                </td>
                <td>
                  <input
                    name="price"
                    className="no-border"
                    type="number"
                    value={expense.price}
                    onChange={handleChange(index, "price")}
                    onBlur={saveChange(index, "price")}
                  />
                </td>
                <td>
                  <input
                    id="delete-button"
                    type="button"
                    value="Delete"
                    onClick={deleteRecord(index)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No Expenses available.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div id="message-box"></div>
    </div>
  );
};
export default Expenses;