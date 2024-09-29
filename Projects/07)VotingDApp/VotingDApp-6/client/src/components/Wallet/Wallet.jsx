import { useEffect } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { handleWallet, web3State } = useWeb3Context();
  const { selectedAccount, networkName } = web3State; // Extract networkName
  const navigateTo = useNavigate();

  useEffect(() => {
    if (selectedAccount) {
      navigateTo('/'); // Redirect to home after connecting wallet
    }
  }, [selectedAccount, navigateTo]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4">Welcome to Voting DApp</h1>
        <p className="text-lg mb-6">
          Participate in a transparent and secure voting process powered by blockchain technology. Connect your wallet to get started!
        </p>
        <button
          onClick={handleWallet}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded transition duration-300 shadow-lg"
        >
          Connect Wallet
        </button>
      </div>

      {/* Display connected wallet information if an account is connected */}
      {selectedAccount && (
    <div className="bg-gray-800 p-6 rounded-md shadow-lg text-center transition transform hover:scale-105">
        <h2 className="text-2xl font-semibold text-blue-400 mb-2">Connected Wallet</h2>
        <p className="mt-2 text-lg text-gray-300">Account Address:</p>
        <p className="mt-1 text-lg font-mono text-white break-all">{selectedAccount}</p>
        <p className="mt-4 text-lg text-gray-300">Blockchain:</p>
        <p className="mt-1 text-lg font-mono text-white">{networkName}</p>
    </div>
)}


      <div className="max-w-4xl mx-auto px-4 mt-8">
        <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
        <ol className="space-y-3">
          <li className="bg-gray-800 p-4 rounded shadow-lg">
            <strong>Step 1:</strong> Connect your wallet to the dApp.
          </li>
          <li className="bg-gray-800 p-4 rounded shadow-lg">
            <strong>Step 2:</strong> Register as a voter or candidate.
          </li>
          <li className="bg-gray-800 p-4 rounded shadow-lg">
            <strong>Step 3:</strong> Participate in the voting process and cast your vote securely.
          </li>
          <li className="bg-gray-800 p-4 rounded shadow-lg">
            <strong>Step 4:</strong> View results and track the election status transparently.
          </li>
        </ol>
      </div>

      
    </div>
  );
};

export default HomePage;
