import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDraw, reset } from "../features/draw/drawSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DrawList from "../components/DrawList";
import Dashboard from "./Dashboard";

const DrawForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [date, setDate] = useState("");

  const [drawData, setDrawData] = useState([
    { position: "", winnerNumber: "" },
  ]);

  // Handle input data
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const data = [...drawData];
    data[index][name] = value;
    setDrawData(data);
  };

  // Add more fields
  const handleAdd = () => {
    setDrawData([...drawData, { position: "", winnerNumber: "" }]);
  };
  // Remove a field
  const handleRemove = (i) => {
    const data = [...drawData];
    data.splice(i, 1);
    setDrawData(data);
  };

  const { isSuccess, isError, message } = useSelector((state) => state.draw);
  const { user, showLogin } = useSelector((state) => state.auth);

  const { position, winnerNumber } = drawData;

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      setDate("");
      // navigate("/");
    }

    // dispatch(reset());
  }, [isError, isSuccess, message, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      drawDateTime: date,
      drawData,
    };

    if (date) {
      dispatch(addDraw(data));
      setDrawData([{ position: "", winnerNumber: "" }]);
    } else {
      console.log(data);
    }
  };

  if (!user) {
    return <Dashboard />;
  }
  return (
    <Fragment>
      <div className="heading">DrawForm</div>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group form-date-time">
            <label htmlFor="fareDraw">Draw Date and Time :</label>
            <div className="form-control">
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                showTimeSelect
                timeIntervals={1}
                // minDate={new Date()}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText=""
                // requireds
              />
            </div>
          </div>
          <div className="form-group">
            <ul>
              {drawData.map((data, i) => {
                return (
                  <li key={i}>
                    <div className="form-draw">
                      <label htmlFor="fareDraw">Position:</label>

                      <div className="form-control-title">
                        <input
                          name="position"
                          type="text"
                          id="position"
                          value={data.position}
                          onChange={(e) => handleChange(e, i)}
                          placeholder=""
                          required
                          maxLength="3"
                        />
                      </div>
                      <label htmlFor="fareDraw">Number:</label>
                      <div className="form-control">
                        <input
                          name="winnerNumber"
                          type="number"
                          id="winnerNumber"
                          value={data.winnerNumber}
                          onChange={(e) => handleChange(e, i)}
                          placeholder=""
                          required
                          minLength="3"
                          maxLength="8"
                        />
                      </div>
                      {drawData.length > 1 && (
                        <button
                          onClick={(i) => handleRemove(i)}
                          className="btn btn-remove"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <button onClick={handleAdd} className="btn add-btn">
            Add More
          </button>

          <button type="submit" className="btn form-btn">
            Submit
          </button>
        </form>
      </section>
      <DrawList />
    </Fragment>
  );
};

export default DrawForm;
