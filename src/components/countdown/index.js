import "./style.css";

const Timer = ({ days, hours, minutes, seconds }) => {
  console.log(hours.toString().padStart(2));
  return (
    <div className="border-2 border-primary py-2 w-full  rounded-lg dark:text-gray-50">
      <h6 className="text-center text-md relative pb-3">ICO ends in</h6>
      <div className="mx-auto mt-3 text-base text-center text-black dark:text-gray-50 font-bold font-sans">
        <span>
          {`${days.toString().padStart(2, "0")}d`}{" "}
          <span className="mx-1">:</span>{" "}
        </span>
        <span>
          {`${hours.toString().padStart(2, "0")}h`}{" "}
          <span className="mx-1">:</span>{" "}
        </span>
        <span>
          {`${minutes.toString().padStart(2, "0")}m`}{" "}
          <span className="mx-1">:</span>{" "}
        </span>
        <span>{`${seconds.toString().padStart(2, "0")}s`} </span>
      </div>
    </div>
  );
};

export default Timer;
