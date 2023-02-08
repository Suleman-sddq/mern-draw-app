import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllDraws, reset } from "../features/draw/drawSlice";
import Spinner from "../components/Spinner";
import DrawItem from "./DrawItem";

function DrawList() {
  const dispatch = useDispatch();

  const { draw, isLoading, isError, message } = useSelector(
    (state) => state.draw
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getAllDraws());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <h1 className="pending-draws">Pending Draws</h1>
      <section className="content">
        {draw.length > 0 ? (
          <div className="draws">
            {draw.map((dr) => (
              <DrawItem
                key={dr._id}
                draw={dr}
                showDrawType={true}
                showCloseButton={true}
              />
            ))}
          </div>
        ) : (
          <div className="pending-draws-message">
            You don't have any pending draws.
          </div>
        )}
      </section>
    </div>
  );
}

export default DrawList;
