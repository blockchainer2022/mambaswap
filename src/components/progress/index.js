// import { useState } from "react";
import "./style.css";

const Index = ({ totalSupply = 0, tokenSold = 0 }) => {
  // console.log((100 * totalSupply) / tokenSold);
  // const [width, setWidth] = useState(0);
  const total = new Intl.NumberFormat("en-GB", {
    notation: "compact",
    compactDisplay: "short",
  }).format(totalSupply);
  const total2 = new Intl.NumberFormat("en-GB", {
    notation: "compact",
    compactDisplay: "short",
  }).format(tokenSold);

  // if (tokenSold > 0) {
  //   const value = (total2 * 100) / total;
  //   // setWidth(value);
  //   console.log(value);
  // }
  // // // function percentage(num, num2) {
  // // //   return (total2 * 100) / total;
  // // // }

  return (
    <div className="my-4 mb-6 dark:text-gray-50 capitalize">
      <div className="flex justify-between items-center">
        <span>{total2}</span>
        <span>{total}</span>
      </div>
      <div className="progress my-1 border-2 border-gray-500">
        <div
          className="progress-value  bg-primary "
          style={{ width: "1%" }}
        ></div>
      </div>
      <div className="flex justify-between items-center">
        <span>softcap </span>
        <span>Hardcap</span>
      </div>
    </div>
  );
};

export default Index;
