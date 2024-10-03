import { useRef } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";

const SellToken = ({ contractInstance, erc20ContractInstance }) => {
  const sellTokenAmountRef = useRef();
  const approveTokenAmountRef = useRef();

  const sellToken = async (e) => {
    e.preventDefault();
    try {
      const tokenValueEth = sellTokenAmountRef.current.value;
      const tokenValueWei = ethers.parseEther(tokenValueEth); // Correct usage of parseEther
      const tx = await contractInstance.sellCkToken(tokenValueWei); // Correct function call
      await tx.wait();
      toast.success("Tokens Sold Successfully");
    } catch (error) {
      toast.error("Error: Selling Token");
      console.error(error);
    }
  };

  const approveToken = async (e) => {
    e.preventDefault();
    try {
      const tokenValueEth = approveTokenAmountRef.current.value;
      const tokenValueWei = ethers.parseEther(tokenValueEth); // Correct usage of parseEther
      const tokenMarketplace = "0x3e492dd46004fba4f8f8a69fa25154a2bcaf787f"; // Marketplace contract address
      const tx = await erc20ContractInstance.approve(tokenMarketplace, tokenValueWei); // Approving tokens for the marketplace
      await tx.wait();
      toast.success("Tokens Approved Successfully");
    } catch (error) {
      toast.error("Error: Approving Token");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={sellToken} className="flex flex-col items-center space-y-4 bg-gray-700 p-4 rounded-lg shadow-md">
        <label className="text-xl font-medium mb-2 text-blue-400">Amount to Sell (ETH):</label>
        <input
          type="text"
          ref={sellTokenAmountRef}
          className="px-3 py-2 rounded-lg bg-gray-600 text-white w-full focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Enter amount"
          required // Ensure the input is required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-red-500 w-full font-semibold hover:bg-red-600 text-white rounded-lg transition duration-300 shadow-lg"
        >
          Sell Token
        </button>
      </form>

      <form onSubmit={approveToken} className="flex flex-col items-center space-y-4 bg-gray-700 p-4 rounded-lg shadow-md">
        <label className="text-xl font-medium mb-2 text-blue-400">Amount to Approve (ETH):</label>
        <input
          type="text"
          ref={approveTokenAmountRef}
          className="px-3 py-2 rounded-lg bg-gray-600 text-white w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter amount"
          required // Ensure the input is required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-yellow-500 w-full font-semibold hover:bg-yellow-600 text-white rounded-lg transition duration-300 shadow-lg"
        >
          Approve Token
        </button>
      </form>
    </div>
  );
};

export default SellToken;
