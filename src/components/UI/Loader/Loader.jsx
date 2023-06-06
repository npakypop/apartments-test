import React from "react";
import css from "./Loader.module.css";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className={css.loaderwrp}>
      <ThreeDots
        height="25"
        width="50"
        radius="9"
        color="#021526"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  
  );
};

export default Loader;
