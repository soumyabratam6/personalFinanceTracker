import React from "react";
import "./styles.css";
const Input = ({ label, state, setState, placeholder, type, autoComplete }) => {
  return (
    <div className="input-wrapper">
      <p className="label-input">{label}</p>
      <input
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
        className="custom-input"
      />
    </div>
  );
};

export default Input;
