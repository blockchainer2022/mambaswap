import { useState, useEffect } from "react";
import { Timer, Form, Progress } from "../../components";
import moment from "moment";
import "./style.css";

const Index = ({
  account,
  buy,
  totalSupply,
  tokenSold,
  bnbBalance,
  icoPrice,
  userTokenBalance,
}) => {
  const difference = +new moment("2021-10-17 00:00:00").utc() - +new Date();

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      if (difference > 0) {
        setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((difference / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((difference / 1000 / 60) % 60));
        setSeconds(Math.floor((difference / 1000) % 60));
      }
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  });

  return (
    <section className="pt-6 pb-2 text-dark">
      <div className="container">
        <div className="max-w-xl w-full mx-auto">
          <Timer
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
          />
          <Progress
            totalSupply={totalSupply}
            tokenSold={tokenSold}
            account={account}
          />
          <Form
            icoPrice={icoPrice}
            account={account}
            buy={buy}
            bnbBalance={bnbBalance}
            userTokenBalance={userTokenBalance}
          />
        </div>
      </div>
    </section>
  );
};

export default Index;
