import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import "./styles/Add.css";

const Add = () => {
  const { user } = useAuth0();
  const getTodaysDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const history = useNavigate();

  const [formData, setFormData] = useState({
    date: getTodaysDate(),
    remarks: "",
    type: "",
    price: "",
    userid: user.sub.replace("auth0|", ""),
  });
  const [ifFailed, setIfFailed] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    document.title = "Add new Expense";
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.date.trim() == "" ||
      formData.remarks.trim() == "" ||
      formData.type.trim() == "" ||
      formData.price.trim() == ""
    ) {
      var errorText = document.getElementById("error-alert");
      errorText.style.visibility = "visible";
      setTimeout(hideError, 5000);
    } else {
      setisSubmit(true);
      const form = {
        date: formData.date,
        remarks: formData.remarks,
        type: formData.type,
        price: formData.price,
        userid: user.sub.replace("auth0|", ""),
      };
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .post("https://expensetracker-lhsl.onrender.com/", form)
        .then((response) => {
          if (response.status != 200) {
            throw "Error";
          }
          var errorText = document.getElementById("form-submit-error");
          errorText.style.visibility = "hidden";
          setisSubmit(false);
          setIfFailed(false);
          formData.date = getTodaysDate();
          formData.remarks = "";
          formData.type = "";
          formData.price = "";
        })
        .catch((error) => {
          console.error("Error:", error);
          setisSubmit(false);
          setIfFailed(true);
          var errorText = document.getElementById("form-submit-error");
          errorText.style.visibility = "visible";
        });
    }
  };
  function hideError() {
    var errorText = document.getElementById("error-alert");
    errorText.style.visibility = "hidden";
  }
  return (
    <section id="contact-section">
      <div id="form-submit-error" style={{ visibility: "hidden" }}>
        <p>
          An Error occured while submitting the form. Please retry after a
          while!
        </p>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="form-container">
              <h2>Add a new Expense!</h2>
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="remarks">Remarks</label>
                  <input
                    type="text"
                    id="remarks"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="type">Type</label>
                  <input
                    type="text"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
                <p id="error-alert">All fields are mandatory</p>
                {isSubmit ? (
                  <button
                    className="submit-button-disabled"
                    type="submit"
                    disabled
                  >
                    Submiting...
                  </button>
                ) : ifFailed ? (
                  <button className="submit-button" type="submit">
                    Retry Submit
                  </button>
                ) : (
                  <button className="submit-button" type="submit">
                    Submit
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Add;
