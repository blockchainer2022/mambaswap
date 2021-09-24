import React from "react";
import "./style.css";

const Index = ({ value = 20, days = 20, totalSupply = 0, tokenSold = 0 }) => {
  const total = new Intl.NumberFormat("en-GB", {
    notation: "compact",
    compactDisplay: "short",
  }).format(totalSupply);
  const total2 = new Intl.NumberFormat("en-GB", {
    notation: "compact",
    compactDisplay: "short",
  }).format(tokenSold);

  return (
    <div className="my-4 mb-6 dark:text-gray-50 capitalize">
      <div className="flex justify-between items-center">
        <span>{total2}</span>
        <span>{total}</span>
      </div>
      <div className="progress my-1 border-2 border-gray-500">
        <div
          className="progress-value  bg-primary "
          style={{ width: value + "%" }}
        ></div>
      </div>
      <div className="flex justify-between items-center">
        <span>softcap in {days} days</span>
        <span>Hardcap</span>
      </div>
    </div>
  );
};

export default Index;
