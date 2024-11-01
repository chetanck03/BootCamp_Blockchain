import { useState, useEffect } from "react";
import { useWeb3 } from "../providers/Web3Provider";
import { ethers } from "ethers";
import { Link } from "react-router-dom";

const WalletComponent = () => {
  const { selectedAccount, chainId, handleWallet, disconnectWallet } = useWeb3();
  const [balance, setBalance] = useState(null);
  const [chainName, setChainName] = useState("");

  useEffect(() => {
    const fetchBalanceAndChainName = async () => {
      if (selectedAccount) {
        const provider = new ethers.BrowserProvider(window.ethereum);

        const balanceWei = await provider.getBalance(selectedAccount);
        const balanceEth = ethers.formatEther(balanceWei);
        setBalance(parseFloat(balanceEth).toFixed(4)); // Display 4 decimal places

        switch (chainId) {
          case 1:
            setChainName("Ethereum Mainnet");
            break;
          case 5:
            setChainName("Goerli Testnet");
            break;
          case 137:
            setChainName("Polygon Mainnet");
            break;
          case 80001:
            setChainName("Mumbai Testnet");
            break;
          case 17000:
            setChainName("ETH Holysky Testnet");
            break;
          default:
            setChainName("Unknown Network");
            break;
        }
      }
    };

    fetchBalanceAndChainName();
  }, [selectedAccount, chainId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 space-y-8">
      <div className="w-full max-w-lg p-8 bg-gray-900 rounded-lg shadow-2xl text-white">
        {selectedAccount ? (
          <>
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text mb-6">Wallet Connected</h2>
            <div className="flex flex-col items-start space-y-4">
              <p className="text-lg break-all">
                <span className="font-semibold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">Account: </span>
                <span className="text-base text-white">{selectedAccount}</span>
              </p>
              <p className="text-lg">
                <span className="font-semibold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">Balance:</span>{" "}
                <span title={`${balance} ETH`} className="cursor-pointer">
                  {balance ? `${balance} ETH` : "Loading..."}
                </span>
              </p>
              <p className="text-lg">
                <span className="font-semibold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">Network:</span> {chainName}
              </p>
            </div>
            <button
              onClick={disconnectWallet}
              className="mt-8 w-full py-3 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold transition duration-200"
            >
              Disconnect Wallet
            </button>
          </>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-300 mb-6">Please connect your wallet!</p>
            <button
              onClick={handleWallet}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition duration-200"
            >
              Connect Wallet
            </button>
          </div>
        )}
      </div>

      {/* Instructions Box */}
      <div className="w-full max-w-lg p-8 bg-gray-900 rounded-lg shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text mb-6">How to Use </h2>
        <ul className="list-inside space-y-2">
          <li className="text-lg">
            <span className="font-semibold bg-gradient-to-r from-purple-300 to-indigo-400 text-transparent bg-clip-text hover:text-indigo-300 transition duration-200">Step 1:</span> After connecting your Ethereum wallet, navigate to the 
            <Link to="/to-do-list" className="text-lg font-semibold bg-gradient-to-r from-purple-300 to-indigo-400 text-transparent bg-clip-text hover:text-indigo-300 transition duration-200"> To Do List section.</Link>
          </li>
          <li className="text-lg">
            <span className="font-semibold bg-gradient-to-r from-purple-300 to-indigo-400 text-transparent bg-clip-text hover:text-indigo-300 transition duration-200">Step 2:</span> Add a new task by entering the task details and clicking the "Create Task" button.
          </li>
          <li className="text-lg">
            <span className="font-semibold bg-gradient-to-r from-purple-300 to-indigo-400 text-transparent bg-clip-text hover:text-indigo-300 transition duration-200">Step 3:</span> View your current tasks in the list below.
          </li>
          <li className="text-lg">
            <span className="font-semibold bg-gradient-to-r from-purple-300 to-indigo-400 text-transparent bg-clip-text hover:text-indigo-300 transition duration-200">Step 4:</span> Mark tasks as toggle, completed, or delete them as needed.
          </li>
        </ul>
      </div>

      {/* Security Information Box */}
      <div className="w-full max-w-lg p-8 bg-gray-900 rounded-lg shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text mb-6">Security & Safety</h2>
        <p className="text-lg mb-4">
          Your wallet connection is secure and safe. Here are some important points to ensure your safety:
        </p>
        <ul className=" space-y-2">
          <li className="text-lg">✅ All transactions are processed on the Ethereum blockchain, ensuring transparency and security.</li>
          <li className="text-lg">✅ We do not store your private keys or sensitive information.</li>
          <li className="text-lg">✅ Ensure you're using a trusted wallet and always verify the website URL.</li>
          <li className="text-lg">✅ Keep your wallet recovery phrases and private keys safe and private.</li>
        </ul>
      </div>
    </div>
  );
};

export default WalletComponent;
