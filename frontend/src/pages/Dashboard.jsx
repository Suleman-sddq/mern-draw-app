import DrawContainer from "../components/DrawContainer";
import CountDownTimer from "../components/CountDownTimer";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentDraw } from "../features/draw/drawSlice";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import WinnersList from "../components/WinnersList";

function Dashboard() {
  const dispatch = useDispatch();

  const { draw, isLoading, isSuccess, drawStatus } = useSelector(
    (state) => state.draw
  );

  useEffect(() => {
    dispatch(getCurrentDraw());
  }, [dispatch, isSuccess]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      {isSuccess && draw.length !== 0 ? (
        <>
          <CountDownTimer
            id={draw[0]._id}
            countDownTimestampMs={draw[0].drawDateTime}
          />
          <DrawContainer luckyNumber={draw[0].drawWinnerNum} />
        </>
      ) : (
        <h1>Please wait for next draw.</h1>
      )}

      <WinnersList />
    </>
  );
}

export default Dashboard;
