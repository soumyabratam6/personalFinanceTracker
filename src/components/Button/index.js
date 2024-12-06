import React from "react";
import "./styles.css";
const Button = ({ text, blue, onClick, disable }) => {
  return (
    <div
      className={blue ? "btn btn-blue" : "btn"}
      onClick={onClick}
      disable={disable}
    >
      {text}
    </div>
  );
};

export default Button;
