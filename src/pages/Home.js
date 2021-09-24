import { Header } from "../components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HeroSection } from "../sections";

toast.configure();
const Home = ({
  account,
  buy,
  totalSupply,
  displayPrice,
  loadWeb3,
  icoPrice,
  bnbBalance,
}) => {
  return (
    <div>
      <Header account={account} loadWeb3={loadWeb3} />
      <HeroSection
        account={account}
        buy={buy}
        totalSupply={totalSupply}
        displayPrice={displayPrice}
        icoPrice={icoPrice}
        bnbBalance={bnbBalance}
      />
    </div>
  );
};

export default Home;
