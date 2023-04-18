import { useState } from "react";
import { useTimeout } from "../hooks/useTimeout";
import Odometer from "react-odometerjs";
import Spinner from "./Spinner";

const DrawNumber = ({ number }) => {
  const [winner, setWinner] = useState(null);

  useTimeout(() => {
    setWinner(number);
  }, 3000);
  if (winner) {
    return (
      <>
        {/* <div className="drawNumber">{number}</div>; */}
        {winner.split("").map((num, index) => (
          <div key={index}>
            <Odometer value={num} format="" duration={10000} />
          </div>
        ))}
      </>
    );
  }
};

export default DrawNumber;
