import { useState } from "react";
import { Link } from "react-router-dom";
import { useWeb3Context } from "../../context/useWeb3Context";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { web3State, handleWallet, disconnectWallet } = useWeb3Context();
  const { selectedAccount } = web3State;
  const account = selectedAccount || "";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleAccountClick = () => {
    if (account) {
      // Disconnect wallet
      disconnectWallet();
    } else {
      // Connect wallet
      handleWallet();
    }
  };

  return (
    <nav className="bg-gray-900 p-3 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold tracking-wide">
          <Link to="/">Voting DApp</Link>
        </div>

        {/* Hamburger Menu (Mobile View) */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-gray-300 focus:outline-none">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>

        {/* Links (Large Screens) */}
        <ul className="hidden lg:flex space-x-6 text-gray-300 text-sm">
          {[
            { path: "/", label: "Home" },
            { path: "/register-voter", label: "Register Voter" },
            { path: "/register-candidate", label: "Register Candidate" },
            { path: "/voter-list", label: "Voter List" },
            { path: "/candidate-list", label: "Candidate List" },
            { path: "/cast-vote", label: "Cast Vote" },
            { path: "/election-commission", label: "Election Commission" },
            { path: "/token-marketplace", label: "Token Marketplace" },
          ].map(({ path, label }) => (
            <li key={label}>
              <Link to={path} className="hover:text-blue-500 transition duration-300">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Account Address (Right side) */}
        <div className="hidden lg:flex items-center ml-4">
          <button
            onClick={handleAccountClick}
            className={`${
              account ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
            } text-white px-4 py-2 rounded-lg shadow-md text-sm transition duration-300 flex items-center`}
          >
            {account ? (
              <>
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A1 1 0 014 17V7a1 1 0 011.513-.858l7.737 4.978a1 1 0 010 1.716l-7.737 4.978A1 1 0 015.12 17.804zM19 12h-2m2 4h-2m2-8h-2"
                  />
                </svg>
                <span className="hidden sm:block">{shortenAddress(account)}</span>
                <span className="sm:hidden text-xs">{shortenAddress(account)}</span>
              </>
            ) : (
              "Connect Wallet"
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="lg:hidden mt-4 space-y-2 text-gray-300 bg-gray-800 rounded-lg shadow-lg p-3">
          {[
            { path: "/", label: "Home" },
            { path: "/register-voter", label: "Register Voter" },
            { path: "/register-candidate", label: "Register Candidate" },
            { path: "/voter-list", label: "Voter List" },
            { path: "/candidate-list", label: "Candidate List" },
            { path: "/cast-vote", label: "Cast Vote" },
            { path: "/election-commission", label: "Election Commission" },
            { path: "/token-marketplace", label: "Token Marketplace" },
          ].map(({ path, label }) => (
            <li key={label}>
              <Link
                to={path}
                className="block px-4 py-2 hover:text-blue-500 hover:bg-gray-700 transition duration-300"
              >
                {label}
              </Link>
            </li>
          ))}
          {/* Mobile Account Button */}
          <div className="mt-4">
            <button
              onClick={handleAccountClick}
              className={`${
                account ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
              } text-white w-full px-4 py-2 rounded-lg shadow-md text-sm transition duration-300 flex items-center justify-center`}
            >
              {account ? (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A1 1 0 014 17V7a1 1 0 011.513-.858l7.737 4.978a1 1 0 010 1.716l-7.737 4.978A1 1 0 015.12 17.804zM19 12h-2m2 4h-2m2-8h-2"
                    />
                  </svg>
                  <span className="text-xs">{shortenAddress(account)}</span>
                </>
              ) : (
                "Connect Wallet"
              )}
            </button>
          </div>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
