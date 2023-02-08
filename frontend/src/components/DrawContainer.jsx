import React, { useState, useEffect } from "react";
import DrawNumber from "./DrawNumber";
import { useDispatch, useSelector } from "react-redux";

const DrawContainer = ({ luckyNumber }) => {
  const { isLoading, isSuccess, announceWinner } = useSelector(
    (state) => state.draw
  );
  const [winNums, setWinNums] = useState([]);

  const charArray = luckyNumber.split("");
  useEffect(() => {
    if (isSuccess) {
      setWinNums(charArray);
    }

    console.log(winNums);
  }, [isSuccess]);

  if (announceWinner) {
    return (
      <div className="drawContainer">
        {winNums.map((num, index) => (
          <DrawNumber key={index} number={num} />
        ))}
      </div>
    );
  }
};

export default DrawContainer;
