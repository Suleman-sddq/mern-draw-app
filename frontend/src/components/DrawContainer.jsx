import React, { useState, useEffect } from "react";
import DrawNumber from "./DrawNumber";
import { useDispatch, useSelector } from "react-redux";

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

      console.log(luckywinnersArray);
    }

    console.log(winNum);
  }, [setPosition, setWinNum]);

  if (announceWinner && !isLoading) {
    return (
      <>
        <div className="draw-position">{position}</div>
        <div className="drawContainer">
          {winNum.split("").map((num, index) => (
            <DrawNumber key={index} number={num} position={position} />
          ))}
        </div>
      </>
    );
  }
};

export default DrawContainer;
