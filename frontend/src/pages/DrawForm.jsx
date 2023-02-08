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
  const [drawMode, setDrawMode] = useState();
  const [drawNum, setDrawNum] = useState("");

  const { isSuccess, isLoading, isError, draw, message } = useSelector(
    (state) => state.draw
  );
  const { user, showLogin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      setDrawNum("");
      setDate("");
      setDrawMode("true");
      // navigate("/");
    }

    // dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(drawNum);
    // console.log(date);

    const drawDate = {
      drawDateTime: date,
      drawWinnerNum: drawNum,
      fareDraw: drawMode,
    };
    if (drawNum && date && drawMode) {
      dispatch(addDraw(drawDate));
      setDrawNum("");
      setDate("");
      setDrawMode("true");
    }
  };

  const handleChange = (e) => {
    setDrawNum(e.target.value);
  };
  if (!user) {
    return <Dashboard />;
  }
  return (
    <Fragment>
      <h1>DrawForm</h1>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-group-radio">
              <label htmlFor="fareDraw">Fare Draw</label>
              <div className="form-control-radio">
                <input
                  className="form-radio"
                  type="radio"
                  name="fareDraw"
                  id="fareDraw"
                  value="true"
                  selected
                  required
                  onChange={(e) => setDrawMode(e.target.value)}
                />
                <div>Yes</div>
              </div>
              <div className="form-control-radio">
                <input
                  className="form-radio"
                  type="radio"
                  name="fareDraw"
                  id="fareDraw"
                  value="false"
                  onChange={(e) => setDrawMode(e.target.value)}
                />{" "}
                <div>No</div>
              </div>
            </div>
            <DatePicker
              className="form-control"
              selected={date}
              onChange={(date) => setDate(date)}
              showTimeSelect
              timeIntervals={10}
              minDate={new Date()}
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText="Select Date and Time"
              required
            />
            <div className="form-group">
              <input
                className="form-control"
                name="drawNum"
                type="text"
                id="drawNum"
                value={drawNum}
                onChange={handleChange}
                placeholder="Enter Draw Number (4 to 8 Characters only)"
                required
                minLength="4"
                maxLength="8"
              />
            </div>
          </div>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </section>
      <DrawList />
    </Fragment>
  );
};

export default DrawForm;
