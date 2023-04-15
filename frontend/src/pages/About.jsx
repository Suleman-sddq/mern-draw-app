import { useSelector, useDispatch } from "react-redux";
import { getCurrentDraw } from "../features/draw/drawSlice";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import WinnersList from "../components/WinnersList";

function About() {
  const dispatch = useDispatch();

  const { isLoading, isSuccess } = useSelector((state) => state.draw);

  useEffect(() => {
    dispatch(getCurrentDraw());
  }, [dispatch, isSuccess]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className=""></div>
    </>
  );
}

export default About;
