import { useDispatch } from "react-redux";
import { deleteDraw } from "../features/draw/drawSlice";
import Clock from "react-live-clock";

function DrawItem({ draw, showCloseButton }) {
  const dispatch = useDispatch();

  return (
    <div className="draw">
      <div className="draw-datetime date">
        {new Date(draw.drawDateTime).toDateString()}
      </div>
      <div className="draw-datetime time">
        {/* {new Date(draw.drawDateTime).toLocaleTimeString(navigator.language, {
          hour: "2-digit",
          minute: "2-digit",
        })} */}
        <Clock
          date={draw.drawDateTime}
          format={"HH:mm"}
          ticking={true}
          timezone={"Europe/Belfast"}
        />
      </div>
      {draw.drawData.map((dr, index) => {
        return (
          <div key={index} className="draw-winner-number">
            {`${dr.position}: ${dr.winnerNumber}`}
          </div>
        );
      })}

      {showCloseButton && (
        <button
          key={draw._id}
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
