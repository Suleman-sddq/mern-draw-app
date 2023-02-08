import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDrawsList } from "../features/draw/drawSlice";
import DrawItem from "./DrawItem";
import Spinner from "./Spinner";

function WinnersList() {
  const dispatch = useDispatch();
  const { allDrawsList, isLoading } = useSelector((state) => state.draw);

  useEffect(() => {
    dispatch(getAllDrawsList());
  }, [dispatch, getAllDrawsList]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="winner-list-content">
      {allDrawsList.length > 0 ? (
        <div className="draws">
          {allDrawsList.map((dr) => (
            <DrawItem
              key={dr._id}
              draw={dr}
              showDrawType={false}
              showCloseButton={false}
            />
          ))}
        </div>
      ) : (
        <div className="pending-draws-message">
          Winners will be soon announced.
        </div>
      )}
    </div>
  );
}

export default WinnersList;
