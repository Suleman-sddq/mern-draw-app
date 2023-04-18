import { useState, useEffect } from "react";
import DrawNumber from "./DrawNumber";
import { useDispatch, useSelector } from "react-redux";
import Odometer from "react-odometerjs";
import { motion, AnimatePresence } from "framer-motion";

const DrawContainer = ({ luckywinnersArray }) => {
  const { isLoading, isSuccess, announceWinner } = useSelector(
    (state) => state.draw
  );
  const [winNum, setWinNum] = useState("");
  const [position, setPosition] = useState("");
  // const winnersArray = luckywinnersArray.map((arr) => arr.winnerNumber);
  const charArray = [];
  useEffect(() => {
    if (luckywinnersArray.length > 0) {
      luckywinnersArray.forEach((element, i) => {
        setTimeout(() => {
          setPosition(element.position);
          setWinNum(element.winnerNumber);
        }, 5000 * i);
      });
    }
  }, [setPosition, setWinNum]);

  if (announceWinner && !isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="draw-position">{position}</div>
        <div className="drawContainer">
          <Odometer value={winNum} format="" duration={5000} />
        </div>
      </motion.div>
    );
  }
};

export default DrawContainer;
