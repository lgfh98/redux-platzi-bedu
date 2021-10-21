import React from "react";
import "../../css/spinner.css";

export const Spinner = () => {
  // return (
  //   <div className="lds-grid" style={{ alignSelf: "center" }}>
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //   </div>
  // );
  return <div className="lds-dual-ring"></div>;
};
