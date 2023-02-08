import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentDraw } from "../features/draw/drawSlice";

const Timer = () => {
  const dispatch = useDispatch();
  const { draw, isLoading, isSuccess } = useSelector((state) => state.draw);

  const [timerDays, setTimerDays] = useState(0);
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);

  var interval;
  const startTimer = (draw) => {
    const countDownDate = new Date(draw[0].drawDateTime);
    console.log("2");

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
        console.log(days);
      }
    });
  };
  // useEffect(() => {
  //   dispatch(getCurrentDraw());
  //   console.log("1");
  //   if (isSuccess) {
  //     startTimer(draw);
  //     // console.log("countDown Date = " + countDownDate);
  //     console.log("3");
  //   }
  // }, [dispatch, getCurrentDraw, draw, isSuccess]);

  return (
    <>
      {/* {`$ : Hours${timerHours} : Minutes${timerMinutes} : Seconds ${timerSeconds}`} */}
      <div className="timer-container">
        <h1>Next draw in</h1>
        <div className="timer">
          <div className="clock">
            <section>
              <p>{timerDays}</p>
              <small>Days</small>
            </section>
            <span>:</span>
            <section>
              <p>{timerHours}</p>
              <small>Hours</small>
            </section>
            <span>:</span>
            <section>
              <p>{timerMinutes}</p>
              <small>Minutes</small>
            </section>
            <span>:</span>
            <section>
              <p>{timerSeconds}</p>
              <small>Seconds</small>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timer;
