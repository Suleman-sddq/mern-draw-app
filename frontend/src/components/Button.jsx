import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ name }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/DrawForm");
  };
  return (
    <div className="btn" onClick={handleClick}>
      {name}
    </div>
  );
};

export default Button;
