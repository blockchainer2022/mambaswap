import { Header } from "../components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HeroSection } from "../sections";

toast.configure();
const Home = ({
  account,
  buy,
  totalSupply,
  tokenSold,
  loadWeb3,
  icoPrice,
  bnbBalance,
  userTokenBalance,
  loadWalleConnect,
}) => {
  return (
    <div>
      <Header
        account={account}
        loadWeb3={loadWeb3}
        loadWalleConnect={loadWalleConnect}
      />
      <HeroSection
        account={account}
        buy={buy}
        totalSupply={totalSupply}
        icoPrice={icoPrice}
        bnbBalance={bnbBalance}
        tokenSold={tokenSold}
        userTokenBalance={userTokenBalance}
        loadWalleConnect={loadWalleConnect}
        loadWeb3={loadWeb3}
      />
    </div>
  );
};

export default Home;
