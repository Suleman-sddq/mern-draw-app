import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { announceWinnerFun } from "../features/draw/drawSlice";
import { getRemainingTimeUntilMsTimestamp } from "./utils/countDownTimerUtils";
import { getCurrentDraw } from "../features/draw/drawSlice";
import { reset } from "../features/draw/drawSlice";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

function CountDownTimer({ countDownTimestampMs, id }) {
  const dispatch = useDispatch();
  const { draw, announceWinner } = useSelector((state) => state.draw);
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  // Check if the countdown time is zero || reached to an end and change the draw status to not-pending
  const timerOver = (countDown) => {
    const nowDayjs = dayjs();
    if (nowDayjs.isSame(countDown) || nowDayjs.isAfter(countDown)) {
      const data = { id: id, drawStatus: "not-pending" };
      dispatch(announceWinnerFun(data));
      setTimeout(() => {
        reset();
        dispatch(getCurrentDraw());
      }, 20000);
      console.log("announce" + data.id);
    }
  };

  //Update the remaining time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countDownTimestampMs);
    }, 1000);
    if (!announceWinner) {
      timerOver(countDownTimestampMs);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [timerOver]);

  const updateRemainingTime = (countDown) => {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countDown));
  };
  return (
    <div className="timer-container">
      <h1 className="heading">Next draw in</h1>
      <div className="timer">
        <div className="clock">
          <section>
            <p>{remainingTime.days}</p>
            <span>Days</span>
          </section>
          <span>:</span>
          <section>
            <p className="two-Numbers">{remainingTime.hours}</p>
            <span>Hours</span>
          </section>
          <span>:</span>
          <section>
            <p className="two-Numbers">{remainingTime.minutes}</p>
            <span>Minutes</span>
          </section>
          <span>:</span>
          <section>
            <p className="two-Numbers">{remainingTime.seconds}</p>
            <span>Seconds</span>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CountDownTimer;
