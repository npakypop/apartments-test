import React from "react";
import css from "./MyButton.module.css";
const MyButton = ({ children, variant, ...props }) => {
  return (
    <button {...props} className={css[variant]}>
      {children}
    </button>
  );
};

export default MyButton;
