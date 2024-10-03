import { useRef } from "react";
import { ethers } from "ethers"; // Use ethers for handling Ethereum transactions
import { toast } from "react-hot-toast";

const BuyToken = ({ contractInstance }) => {
  const buyTokenAmountRef = useRef();

  const buyToken = async (e) => {
    e.preventDefault();
    try {
      const tokenValueEth = buyTokenAmountRef.current.value;
      const tokenValueWei = ethers.parseEther(tokenValueEth); 
      const tx = await contractInstance.buyCkToken(tokenValueEth, { value: tokenValueWei }); 
      await tx.wait(); // Wait for the transaction to be mined
      toast.success("Tokens Purchased Successfully");
    } catch (error) {
      toast.error("Error: Buying Token");
      console.error(error);
    }
  };

  return (
    <form onSubmit={buyToken} className="flex flex-col items-center space-y-4 bg-gray-700 p-4 rounded-lg shadow-md">
      <label className="text-xl font-medium mb-2 text-blue-400">Amount to Buy (ETH):</label>
      <input
        type="text"
        ref={buyTokenAmountRef}
        className="px-3 py-2 rounded-lg bg-gray-600 text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter amount"
        required // Ensure the input is required
      />
      <button
        type="submit"
        className="px-6 py-2 font-semibold bg-blue-500 w-full hover:bg-blue-600 text-white rounded-lg transition duration-300 shadow-lg"
      >
        Buy Token
      </button>
    </form>
  );
};

export default BuyToken;
