import { useEffect, useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import erc20abi from "../../constant/erc20Abi.json";

const HomePage = () => {
  const { handleWallet, disconnectWallet, web3State } = useWeb3Context();
  const { selectedAccount, networkName, provider } = web3State;
  const [userTokenBalance, setUserTokenBalance] = useState(null);
  const [erc20ContractInstance, setErc20ContractInstance] = useState(null);
  const navigateTo = useNavigate();

  // Redirect to home after connecting wallet
  useEffect(() => {
    if (selectedAccount) navigateTo('/');
  }, [selectedAccount, navigateTo]);

  // Initialize ERC20 contract when provider is available
  useEffect(() => {
    if (!provider) return;

    const initializeErc20Contract = () => {
      try {
        const contractAddress = "0xc9cE88752f6bAc4E6449938C0ac399d4C16Bb623";
        const contract = new ethers.Contract(contractAddress, erc20abi, provider);
        setErc20ContractInstance(contract);
      } catch (error) {
        toast.error("Error initializing ERC20 contract.");
      }
    };

    initializeErc20Contract();
  }, [provider]);

  // Fetch token balance when contract instance and account are available
  useEffect(() => {
    const fetchTokenBalance = async () => {
      if (!erc20ContractInstance || !selectedAccount) return;

      try {
        const tokenBalanceWei = await erc20ContractInstance.balanceOf(selectedAccount);
        const tokenBalanceEth = ethers.formatEther(tokenBalanceWei); 
        setUserTokenBalance(tokenBalanceEth);
      } catch (error) {
        toast.error("Error: Getting Token Balance");
        console.error(error);
      }
    };

    fetchTokenBalance();
  }, [erc20ContractInstance, selectedAccount]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mt-4 mb-4">Welcome to Voting DApp</h1>
        <p className="text-lg mb-6">
          Participate in a transparent and secure voting process powered by blockchain technology. Connect your wallet to get started!
        </p>
        
        {/* Show Connect or Disconnect button based on wallet connection state */}
        <button
          onClick={selectedAccount ? disconnectWallet : handleWallet}
          className={`bg-${selectedAccount ? 'red' : 'blue'}-600 hover:bg-${selectedAccount ? 'red' : 'blue'}-600 text-white font-semibold py-3 px-6 rounded transition duration-300 shadow-lg`}
        >
          {selectedAccount ? "Disconnect Wallet" : "Connect Wallet"}
        </button>
      </div>

      {/* Display connected wallet information if an account is connected */}
      {selectedAccount && (
        <div className="bg-gray-800 p-6 rounded-md shadow-lg text-center transition transform hover:scale-105">
          <p className="mt-2 text-xl font-semibold text-blue-400 ">Account Address:</p>
          <p className="mt-1 text-lg font-mono text-white break-all">{selectedAccount}</p>
          <p className="mt-4 text-xl font-semibold text-blue-400 ">Blockchain:</p>
          <p className="mt-1 text-lg font-mono text-white">{networkName}</p>

          {/* Display CKToken Balance */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-blue-400 "> Token Balance:</h3>
            <p className="mt-2 text-lg font-mono text-white">
              {userTokenBalance !== null ? `${userTokenBalance} Ck Token` : "Loading..."}
            </p>
          </div>
        </div>
      )}

      {/* How It Works Section */}
      <div className="max-w-4xl mx-auto px-4 mt-8 ">
        <h2 className="text-3xl font-semibold mb-4 text-blue-400 text-center">How It Works</h2>
        <ol className="space-y-3">
          <li className="bg-gray-800 p-4 rounded shadow-lg"><strong>Step 1:</strong> Connect your wallet to the dApp.</li>
          <li className="bg-gray-800 p-4 rounded shadow-lg"><strong>Step 2:</strong> Buy CKTokens from the <button onClick={() => navigateTo("/token-marketplace")} className="text-blue-400">Token Marketplace</button> if you don't have any.</li>
          <li className="bg-gray-800 p-4 rounded shadow-lg"><strong>Step 3:</strong> Participate in voting only if you hold CKTokens.</li>
          <li className="bg-gray-800 p-4 rounded shadow-lg"><strong>Step 4:</strong> View results and track the election status transparently.</li>
        </ol>
      </div>

      {/* Security Information Box */}
      <div >
        <h2 className="text-3xl text-blue-400 mt-4 font-bold text-center ">Security & Safety</h2>
        <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg text-white mt-8 mx-auto">
        <p className="text-lg mb-4">
          Your wallet connection is secure and safe. Here are some important points to ensure your safety:
        </p>
        <ul className="space-y-2">
          <li className="text-lg">✅ All transactions are processed on the Ethereum blockchain, ensuring transparency and security.</li>
          <li className="text-lg">✅ We do not store your private keys or sensitive information.</li>
          <li className="text-lg">✅ Ensure you're using a trusted wallet and always verify the website URL.</li>
          <li className="text-lg">✅ Keep your wallet recovery phrases and private keys safe and private.</li>
        </ul>
      </div>
      </div>
    </div>
  );
};

export default HomePage;
