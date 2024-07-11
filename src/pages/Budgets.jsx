import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import "./styles/Budgets.css";

const Budgets = () => {
  const { user } = useAuth0();
  const [formData, setFormData] = useState({
    budgetName: "",
    budgetCategory: "",
    period: "",
    budgetAmount: "",
    note: "",
    userid: user.sub.replace("auth0|", ""),
  });
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addNewCount, setAddNewCount] = useState(0);
  const [budgetDetails, setBudgetDetails] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    axios
      .get(`${API_URL}budgets/getcategory`)
      .then((response) => {
        setOptions(response.data);
        setAddNewCount(addNewCount + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${API_URL}budgets/getbudgets?userid=${user.sub.replace("auth0|", "")}`
      )
      .then((response) => {
        setOptions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${API_URL}budgets/getbudgetdetails?userid=${user.sub.replace(
          "auth0|",
          ""
        )}`
      )
      .then((response) => {
        console.log(response.data);
        setBudgetDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [addNewCount]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePeriodChange = (event) => {
    setFormData({ ...formData, period: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      formData.budgetAmount != "" &&
      formData.budgetName != "" &&
      formData.period != ""
    ) {
      console.log("formData: ", formData);
      axios
        .post(`${import.meta.env.VITE_API_URL}budgets/addbudget`, formData)
        .then((response) => {
          alert("Success");
          formData.budgetName = "";
          formData.budgetCategory = "";
          formData.period = "";
          formData.budgetAmount = "";
          formData.note = "";
        })
        .catch((error) => {
          alert(error);
          console.error("Error submitting the form:", error);
        })
        .finally(() => {});
    } else {
      alert("* Fields are Mandatory!");
    }
  };

  return (
    <div id="budgets-container">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="budgets-heading">Add New Budget</div>
            <form id="add-budget-form" onSubmit={handleSubmit}>
              <span className="input-section">
                <label htmlFor="budget-name" className="form-label">
                  Budget Name*
                </label>
                <input
                  type="text"
                  name="budgetName"
                  id="budget-name"
                  className="form-input"
                  value={formData.budgetName}
                  onChange={handleInputChange}
                />
              </span>
              <span className="input-section">
                <label htmlFor="budget-category" className="form-label">
                  Budget Category
                </label>
                <select
                  name="budgetCategory"
                  id="budget-category"
                  className="form-input"
                  value={formData.budgetCategory}
                  onChange={handleInputChange}
                >
                  <option value=""></option>
                  {Array.isArray(options) && options.length > 0 ? (
                    options.map((opt, index) => (
                      <option key={index} value={opt.type}>
                        {opt.type}
                      </option>
                    ))
                  ) : (
                    <option>No Expenses available.</option>
                  )}
                </select>
              </span>
              <span className="input-section">
                <label className="form-label">Period*</label>
                <span className="radio-group">
                  <input
                    type="radio"
                    id="yearly"
                    name="period"
                    value="yearly"
                    checked={formData.period === "yearly"}
                    onChange={handlePeriodChange}
                  />
                  <label htmlFor="yearly">Yearly</label>
                </span>
                <span className="radio-group">
                  <input
                    type="radio"
                    id="monthly"
                    name="period"
                    value="monthly"
                    checked={formData.period === "monthly"}
                    onChange={handlePeriodChange}
                  />
                  <label htmlFor="monthly">Monthly</label>
                </span>
              </span>
              <span className="input-section">
                <label htmlFor="budget-amount" className="form-label">
                  Budget Amount*
                </label>
                <input
                  type="number"
                  name="budgetAmount"
                  id="budget-amount"
                  className="form-input"
                  value={formData.budgetAmount}
                  onChange={handleInputChange}
                />
              </span>
              <span className="input-section">
                <label htmlFor="note" className="form-label">
                  Note
                </label>
                <textarea
                  name="note"
                  id="note"
                  className="form-input"
                  value={formData.note}
                  onChange={handleInputChange}
                />
              </span>
              <div className="make-it-small">* Mandatory fields</div>
              <button type="submit" className="form-submit-button">
                Submit
              </button>
            </form>
          </div>
          <div className="col-md-9">
            <div id="list-budgets">
              <div className="budgets-heading">Existing Budgets</div>
              {Array.isArray(budgetDetails) && budgetDetails.length > 0 ? (
                budgetDetails.map((budget, index) => (
                  <div key={index} className="container">
                    <div className="row">
                      <div className="col-md-4">Budget Name: {budget.budgetName}</div>
                      <div className="col-md-4">Budget Category: {budget.budgetCategory}</div>
                      <div className="col-md-4">Period: {budget.budgetPeriod}</div>
                    </div>
                    <div className="row">
                      <div className="col-md-1">Notes:</div>
                      <div className="col-md-11">
                        {budget.budgetNote}
                      </div>
                    </div>
                    <div className="row">
                      <div id="budget-status-message">
                        10% of allocated budget spent for the month July 2024
                      </div>
                      <div>Budget Allocated: &nbsp;&nbsp; {budget.budgetAmount}</div>
                      <div>
                        Spent Amount:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {budget.actualExpense}
                      </div>
                    </div>
                    <br/>
                  </div>
                ))
              ) : (
                <option>No Budgets available.</option>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budgets;
