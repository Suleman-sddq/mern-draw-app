import DrawContainer from "../components/DrawContainer";
import CountDownTimer from "../components/CountDownTimer";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentDraw } from "../features/draw/drawSlice";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { motion, AnimatePresence } from "framer-motion";

function Dashboard() {
  const dispatch = useDispatch();

  const { draw, isLoading, isSuccess, drawStatus, announceWinner } =
    useSelector((state) => state.draw);

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
          {!announceWinner && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2 }}
              >
                <CountDownTimer
                  id={draw[0]._id}
                  countDownTimestampMs={draw[0].drawDateTime}
                />
              </motion.div>
            </>
          )}
          {announceWinner && (
            <DrawContainer luckywinnersArray={draw[0].drawData} />
          )}
        </>
      ) : (
        <div className="heading">Please wait for next draw.</div>
      )}
    </>
  );
}

export default Dashboard;
