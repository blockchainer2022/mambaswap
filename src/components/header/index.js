import { useState, useContext } from "react";
import "./style.css";
import Logo from "../../assets/images/LOGOFINAL.png";
import Sun from "../../assets/images/Sun.svg";
import Moon from "../../assets/images/Moon.svg";
import Button from "../button";
import { ThemeContext } from "../../contexts/themeContext";
import WalletPopup from "../walletpopup";

const Index = ({ account, loadWeb3, loadWalleConnect }) => {
  const [open, setOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <header className=" bg-primary  text-white shadow-md ">
      <nav className=" container flex items-center justify-between relative py-2.5">
        <div className="w-14 flex-1 md:flex-none">
          <img src={Logo} alt="logo" className="w-12  md:w-14" />
        </div>
        <div className="hidden md:block flex-1">
          <ul className="flex list-none font-medium ml-8 ">
            <li className="p-3.5 text-sm">
              <a href="http://mambatoken.org/" target="_blank" rel="noreferrer">
                Home
              </a>
            </li>
            <li className="p-3.5 text-sm">
              <a
                href="https://www.dextools.io/app/bsc/pair-explorer/0xd718ae747c491cd00380b27ad0ad0c60394958c2"
                target="_blank"
                rel="noreferrer"
              >
                Price Chart
              </a>
            </li>
            <li className="p-3.5 text-sm">
              <a
                href="https://mambatoken.org/#stats"
                target="_blank"
                rel="noreferrer"
              >
                Token Details
              </a>
            </li>
            <li className="p-3.5 text-sm">
              <a href="https://t.me/MambaDev" target="_blank" rel="noreferrer">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="transition-all duration-500 bg-secondary bg-opacity-25 h-8 w-8 md:w-10 md:h-10 flex justify-center items-center rounded-full"
        >
          <img
            src={theme === "dark" ? Moon : Sun}
            alt="sun"
            className="w-5 sm:w-6 "
          />
        </button>

        <div className="ml-3">
          <Button responsive onClick={() => setWalletOpen((prev) => !prev)}>
            {account
              ? account.slice(0, 8) + "..." + account.slice(account.length - 5)
              : "Connect Wallet"}
          </Button>
        </div>

        {/* Active on Mobile */}
        <div className=" text-lg cursor-pointer md:hidden ">
          <span
            onClick={() => setOpen(!open)}
            className="transition-all duration-1000 text-xl bar"
          >
            {open ? (
              <i class="fas fa-times  "></i>
            ) : (
              <i className="fas fa-bars "></i>
            )}
          </span>
        </div>
        <div
          className={`mobile-nav bg-primary ${
            open ? "active" : null
          } md:hidden`}
        >
          <ul className="list-none text-center font-medium p-8 text-white">
            <li className="p-2 text-sm " onClick={() => setOpen(!open)}>
              <a href="http://mambatoken.org/" target="_blank" rel="noreferrer">
                Home
              </a>
            </li>
            <li className="p-2 text-sm" onClick={() => setOpen(!open)}>
              <a
                href="https://www.dextools.io/app/bsc/pair-explorer/0xd718ae747c491cd00380b27ad0ad0c60394958c2"
                target="_blank"
                rel="noreferrer"
              >
                Price Chart
              </a>
            </li>
            <li className="p-2 text-sm" onClick={() => setOpen(!open)}>
              <a
                href="https://mambatoken.org/#stats"
                target="_blank"
                rel="noreferrer"
              >
                Token Details
              </a>
            </li>
            <li className="p-2 text-sm" onClick={() => setOpen(!open)}>
              <a href="https://t.me/MambaDev" target="_blank" rel="noreferrer">
                Contact Us
              </a>
            </li>

            <li className="p-2 text-sm">
              <Button onClick={() => setWalletOpen((prev) => !prev)}>
                {account
                  ? account.slice(0, 8) +
                    "..." +
                    account.slice(account.length - 5)
                  : "CONNECT"}
              </Button>
            </li>
          </ul>
        </div>
      </nav>
      <WalletPopup
        open={walletOpen}
        onClose={setWalletOpen}
        title={account ? "Disconnect Wallet" : "Select a Wallet"}
        text={
          account
            ? "Are you sure you want to disconnect?"
            : "Please select a wallet to connect to this dapp:"
        }
        metaMaskHandler={loadWeb3}
        account={account}
        loadWalleConnect={loadWalleConnect}
      />
    </header>
  );
};

export default Index;
