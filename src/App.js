import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Web3 from "web3";
import { contractAbi, contractAddress } from "./config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import { InformationModal, ConfirmationLoadingPopup } from "./components";
import axios from "axios";
function App() {
  const [chainId, setChainId] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [price, setPrice] = useState(0);
  const [bnbBalance, setBnbBalance] = useState(0);
  const [icoPrice, setIcoPrice] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [tokenSold, setTokenSold] = useState(0);
  const [userTokenBalance, setUserTokenBalance] = useState(0);
  //FOR POPUP
  const [accessAccountDenied, setAccessAccountDenied] = useState(false);
  const [installEthereum, setInstallEthereum] = useState(false);
  const [nftMinted, setNftMinted] = useState(false);
  const [nftMinting, setNftMinting] = useState(false);
  const [transactionRejected, setTransactionRejected] = useState(false);
  const [transactionFailed, setTransactionFailed] = useState(false);
  const [switchToMainnet, setswitchToMainnet] = useState(false);
  const [ethereumCompatibleBrowser, setEthereumCompatibleBrowser] =
    useState(false);
  const [mintingInProgress, setMintingInProgress] = useState(false);
  const [confirmTransaction, setConfirmTransaction] = useState(false);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        loadBlockchainData();
        getCurrentAddressConnected();
        addAccountsAndChainListener();
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        const balance = await window.web3.eth.getBalance(accounts[0]);
        const balance_Eth = window.web3.utils.fromWei(balance, "ether");
        console.log("balance:", balance);
        console.log("balance_Eth:", balance_Eth);
        setBnbBalance(balance_Eth);
        console.log(bnbBalance);
      } catch (error) {
        if (error.code === 4001) {
          // swal("Request to access account denied!", "", "error");
          setAccessAccountDenied(true);
        } else console.error(error);
      }
    } else {
      setInstallEthereum(true);
      // swal(
      //   "",
      //   "Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!",
      //   "error"
      // );
    }
  }
  useEffect(() => {
    loadWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadBlockchainData = async () => {
    const contract = new window.web3.eth.Contract(contractAbi, contractAddress);
    setContract(contract);
    const chainId = await window.web3.eth.getChainId();
    setChainId(chainId);
    //success when chainId = 97 else failure
    // you are connected to main net
    // Please connect to main net

    if (chainId === 97) {
      toast(`you are connected to main net`, {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
      });
      const totalsupply = await contract.methods.getTokenSupply().call();
      const finalTotalSupply = window.web3.utils.fromWei(totalsupply, "ether");
      // console.log("totalSupply:", finalTotalSupply);
      setTotalSupply(finalTotalSupply);

      const price = await contract.methods.getICOPrice().call();
      setPrice(price);

      const convertedICOPrice = Web3.utils.fromWei(price);
      setIcoPrice(convertedICOPrice);
      // console.log("icoprice:", convertedICOPrice);
      const tokensold = await contract.methods.tokenSold().call();
      const finalTokenSold = window.web3.utils.fromWei(tokensold, "ether");
      // console.log("tokenSold:", finalTokenSold);
      setTokenSold(finalTokenSold);
      const postTokens = async () => {
        try {
          const response = await axios.post(
            "https://defi.mobiwebsolutionz.com/api/mamba/update.php",
            {
              total_supply: finalTotalSupply,
              total_sold: finalTokenSold,
            }
          );
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      };

      postTokens();
      const tokenBalance = await contract.methods
        .getUserTokenBalance()
        .call({ from: account });
      console.log("User Token Balance without convert:", tokenBalance);

      const finalTokenBalance = await window.web3.utils.fromWei(
        tokenBalance,
        "ether"
      );
      console.log("User Token Balance:", finalTokenBalance);
      setUserTokenBalance(finalTokenBalance);
    } else {
      toast("Please connect to main net", {
        type: "error",
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const getCurrentAddressConnected = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addAccountsAndChainListener = async () => {
    //this event will be emitted when the currently connected chain changes.
    window.ethereum.on("chainChanged", (_chainId) => {
      window.location.reload();
    });

    // this event will be emitted whenever the user's exposed account address changes.
    window.ethereum.on("accountsChanged", (accounts) => {
      window.location.reload();
    });
  };

  // const data = {
  //   total_supply: "10000",
  //   total_sold: "100",
  // };

  // useEffect(() => {
  //   const postTokens = async () => {
  //     try {
  //       const response = await axios.post(
  //         "https://defi.mobiwebsolutionz.com/api/mamba/update.php",
  //         {
  //           total_supply: totalSupply,
  //           total_sold: tokenSold,
  //         }
  //       );
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   postTokens();
  // }, []);

  async function buy(buyAmount) {
    if (contract) {
      if (chainId === 97) {
        if (buyAmount === 0) {
          swal("Atleast 1 Agod should be purchased", "", "info");
        } else {
          setConfirmTransaction(true);
          const finalPrice = Number(price) * buyAmount;
          const finalAmount = window.web3.utils.toWei(
            buyAmount.toString(),
            "ether"
          );
          console.log("finalPrice:", finalPrice);
          console.log("finalAmount:", finalAmount);
          await contract.methods
            .buy(finalAmount)
            .send({ from: account, value: finalPrice })
            .on("transactionHash", function () {
              // swal({
              //   title: "Minting NFT!",
              //   icon: "info",
              // });
              setConfirmTransaction(false);
              setMintingInProgress(true);
            })
            .on("confirmation", function () {
              const el = document.createElement("div");
              el.innerHTML =
                "View minted NFT on OpenSea : <a href='https://testnets.opensea.io/account '>View Now</a>";

              // swal({
              //   title: "NFT Minted!",
              //   content: el,
              //   icon: "success",
              // });
              setNftMinted(true);
              setConfirmTransaction(false);
              setMintingInProgress(false);
            })
            .on("error", function (error, receipt) {
              if (error.code === 4001) {
                // swal("Transaction Rejected!", "", "error");
                setTransactionRejected(true);
                setConfirmTransaction(false);
                setMintingInProgress(false);
              } else {
                // swal("Transaction Failed!", "", "error");
                setTransactionFailed(true);
                setConfirmTransaction(false);
                setMintingInProgress(false);
              }
            });
        }
      } else {
        // swal("Please switch to mainnet to buy Agod", "", "error");
        setswitchToMainnet(true);
      }
    } else {
      // swal(
      //   "",
      //   "Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!",
      //   "error"
      // );
      setEthereumCompatibleBrowser(true);
    }
  }

  return (
    <div>
      <Home
        account={account}
        bnbBalance={bnbBalance}
        buy={buy}
        icoPrice={icoPrice}
        totalSupply={totalSupply}
        tokenSold={tokenSold}
        userTokenBalance={userTokenBalance}
      />
      <InformationModal
        open={accessAccountDenied}
        onClose={setAccessAccountDenied}
        title="Oops"
        text="Request to access account denied!"
      />
      <InformationModal
        open={installEthereum}
        onClose={setInstallEthereum}
        title="Oops"
        text="Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"
      />
      <InformationModal
        open={nftMinted}
        onClose={setNftMinted}
        title="Swap Successful"
        text="You have successfully Swapped BNBs with MAMBAs"
      />
      <InformationModal
        open={nftMinting}
        onClose={setNftMinting}
        title="Information"
        text="Purchasing NFT!"
      />
      <InformationModal
        open={transactionRejected}
        onClose={setTransactionRejected}
        title="Error"
        text="Transaction Rejected!"
      />
      <InformationModal
        open={transactionFailed}
        onClose={setTransactionFailed}
        title="Error"
        text="Transaction Failed!"
      />
      <InformationModal
        open={switchToMainnet}
        onClose={setswitchToMainnet}
        title="Error"
        text="Please switch to mainnet to Buy Mamba"
      />
      <InformationModal
        open={ethereumCompatibleBrowser}
        onClose={setEthereumCompatibleBrowser}
        title="Error"
        text="Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"
      />
      <ConfirmationLoadingPopup
        open={confirmTransaction}
        title="Confirm Transaction"
        message="Confirm transaction to swap the BNBs with MAMBAs"
      />
      <ConfirmationLoadingPopup
        open={mintingInProgress}
        title="Buying In Progress"
        message="Please wait to get confirmation of the transaction from blockchain"
      />
    </div>
  );
}

export default App;
