import { useDispatch } from "react-redux";
import { deleteDraw } from "../features/draw/drawSlice";

function DrawItem({ draw, showDrawType, showCloseButton }) {
  const dispatch = useDispatch();

  return (
    <div className="draw">
      <div className="draw-datetime date">
        {new Date(draw.drawDateTime).toDateString()}
      </div>
      <div className="draw-datetime time">
        {new Date(draw.drawDateTime)
          .toLocaleTimeString()
          .replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, "$1")}
      </div>
      <div className="draw-winner-number">{draw.drawWinnerNum}</div>
      {showDrawType && (
        <div className="draw-type">
          {draw.fareDraw === "true" ? "Fare Draw" : "Not Fare Draw"}
        </div>
      )}
      {showCloseButton && (
        <button
          className="close"
          onClick={() => dispatch(deleteDraw(draw._id))}
        >
          X
        </button>
      )}
    </div>
  );
}

export default DrawItem;
