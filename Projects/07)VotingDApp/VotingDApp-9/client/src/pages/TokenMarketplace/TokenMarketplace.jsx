import { useWeb3Context } from "../../context/useWeb3Context";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import BuyToken from "../../components/TokenMarketPlace/BuyToken";
import SellToken from "../../components/TokenMarketPlace/SellToken";
import TokenBalance from "../../components/TokenMarketPlace/TokenBalance";
import TokenPrice from "../../components/TokenMarketPlace/TokenPrice";
import { toast } from "react-hot-toast";
import tokenMarketplaceAbi from "../../constant/tokenMarketplaceAbi.json";
import erc20abi from "../../constant/erc20Abi.json";

const TokenMarketplace = () => {
  const [tokenMarketplaceInstance, setTokenMarketplaceInstance] = useState(null);
  const [erc20ContractInstance, setErc20ContractInstance] = useState(null);
  const { web3State } = useWeb3Context();
  const { signer, provider } = web3State;
-
  useEffect(() => {
    const erc20TokenInit = () => {
      try {
        const contractAddress = "0x0Ad2Cde68846d3EEd59DEDEeb5556a2209c69134";
        const erc20ContractInstance = new ethers.Contract(contractAddress, erc20abi, provider);
        setErc20ContractInstance(erc20ContractInstance);
      } catch (error) {
        toast.error("Error initializing ERC20 contract.");
      }
    };
    provider && erc20TokenInit();
  }, [provider]);

  useEffect(() => {
    const tokenMarketplaceInit = () => {
      try {
        const tokenMarketplaceContractAddress = "0x6028ef583d67d95bb97F02eD5E83D1e1a6DeDB48";
        const tokenMarketplaceInstance = new ethers.Contract(tokenMarketplaceContractAddress, tokenMarketplaceAbi, signer);
        setTokenMarketplaceInstance(tokenMarketplaceInstance);
      } catch (error) {
        toast.error("Error initializing Token Marketplace.");
        console.error(error);
      }
    };
    signer && tokenMarketplaceInit();
  }, [signer]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-blue-400">Token Marketplace</h1>

      {/* How It Works Section */}
       <div className="max-w-4xl mx-auto px-4 mt-4">
        <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
        <ol className="space-y-3">
          <li className="bg-gray-800 p-4 rounded shadow-lg"><strong>Step 1:</strong> Connect your wallet to the dApp.</li>
          <li className="bg-gray-800 p-4 rounded shadow-lg"><strong>Step 2:</strong> Check your CkToken balance before making any transactions.</li>
          <li className="bg-gray-800 p-4 rounded shadow-lg"><strong>Step 3:</strong> Buy CkTokens from the marketplace if you don't have any.</li>
          <li className="bg-gray-800 p-4 rounded shadow-lg"><strong>Step 4:</strong> Sell your CkTokens back to the marketplace if needed.</li>
          <li className="bg-gray-800 p-4 rounded shadow-lg"><strong>Step 5:</strong> Track your transactions, including purchases and sales.</li>
          <li className="bg-gray-800 p-4 rounded shadow-lg"><strong>Step 6:</strong> Withdraw excess tokens or Ether if you are the owner of the contract.</li>
        </ol>
      </div>

      <div className="bg-gray-800 mt-12 p-6 rounded-lg shadow-lg w-full max-w-3xl space-y-6">
        <TokenBalance erc20ContractInstance={erc20ContractInstance} />
        <TokenPrice contractInstance={tokenMarketplaceInstance} />
        <BuyToken contractInstance={tokenMarketplaceInstance} />
        <SellToken erc20ContractInstance={erc20ContractInstance} contractInstance={tokenMarketplaceInstance} />
      </div>
    </div>
  );
};

export default TokenMarketplace;
