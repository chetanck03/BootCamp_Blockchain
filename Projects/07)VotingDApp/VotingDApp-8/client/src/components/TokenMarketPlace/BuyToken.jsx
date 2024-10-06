import { useRef } from "react";
import { ethers } from "ethers"; // Use ethers for handling Ethereum transactions
import { toast } from "react-hot-toast";

const BuyToken = ({ contractInstance }) => {
  const buyTokenAmountRef = useRef();

  const buyToken = async (e) => {
    e.preventDefault();
    try {
      const tokenValueEth = buyTokenAmountRef.current.value;

      // Input validation
      if (isNaN(tokenValueEth) || parseFloat(tokenValueEth) <= 0) {
        toast.error("Please enter a valid amount.");
        return;
      }

      const tokenValueWei = ethers.parseEther(tokenValueEth); // Ensure correct conversion
      console.log("Token Value in Wei:", tokenValueWei.toString());

      // Ensure the contract instance has a signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner(); // Get the signer
      const contractWithSigner = contractInstance.connect(signer); // Connect the contract to the signer

      // Prepare transaction options
      const tx = await contractWithSigner.buyCkToken(tokenValueWei, {
        value: tokenValueWei, // Set the Ether value sent with the transaction
        gasLimit: 500000, // Try increasing gas limit if needed
      });
      
      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log("Transaction Receipt:", receipt);

      toast.success("Tokens Purchased Successfully");
    } catch (error) {
      if (error.reason) {
        toast.error(`Error: ${error.reason}`);
      } else {
        toast.error("Error: Buying Token");
      }
      console.error("Transaction Error:", error);
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
