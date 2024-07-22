import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import "./styles/BudgetDetails.css";
import { useEffect } from "react";
const BudgetDetails = ({ details }) => {
  const { user } = useAuth0();
  const [expenseList, setExpenseList] = [];
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    // if (details != undefined) {
      console.log("details: ", details);
      axios
        .get(
          `${API_URL}budgets/getbudgetdetails/list?userid=${user.sub.replace(
            "auth0|",
            ""
          )}
             &period=${details.budgetPeriod}&category=${details.budgetCategory}`
        )
        .then((response) => {
          // setExpenseList(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    // }
  }, [details]);

  const hideDetails = () => {
    document.getElementById("budget-details-section").style.left = "99%";
  };
  return (
    <div id="budget-details-section">
      <button onClick={hideDetails}>Close</button>
      <h1>{details == undefined ? "" : details.budgetName}</h1>
    </div>
  );
};

export default BudgetDetails;
