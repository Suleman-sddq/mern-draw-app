import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import DrawForm from "./pages/DrawForm";
import LastWinners from "./pages/LastWinners";
import { ToastContainer } from "react-toastify";
import { useMultipleKeyPress } from "./components/utils/useMultipleKeyPress";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { activateLogin, deActivateLogin } from "./features/auth/authSlice";
import { useState } from "react";
import Footer from "./components/Footer";

function App() {
  const [toggleLogin, setToggleLogin] = useState(true);
  const dispatch = useDispatch();
  const handler = () => {
    if (toggleLogin) {
      dispatch(activateLogin());
      setToggleLogin(false);
    } else {
      dispatch(deActivateLogin());
      setToggleLogin(true);
    }
  };
  useMultipleKeyPress(handler, ["k", "p", "l"]);
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/DrawForm" element={<DrawForm />} />
          <Route path="/previousWinners" element={<LastWinners />} />
        </Routes>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
}

export default App;