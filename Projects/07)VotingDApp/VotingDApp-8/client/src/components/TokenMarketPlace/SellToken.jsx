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
      const tokenValueWei = ethers.parseEther(tokenValueEth); // Convert ETH to Wei

      // Ensure the contract instance has a signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner(); // Get the signer
      const contractWithSigner = contractInstance.connect(signer); // Connect the contract to the signer

      // Call the sellCkToken function
      const tx = await contractWithSigner.sellCkToken(tokenValueWei);
      
      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log("Transaction Receipt:", receipt);
      toast.success("Tokens Sold Successfully");
    } catch (error) {
      toast.error("Error: Selling Token");
      console.error("Selling Token Error:", error);
    }
  };

  const approveToken = async (e) => {
    e.preventDefault();
    try {
      const tokenValueEth = approveTokenAmountRef.current.value;
      const tokenValueWei = ethers.parseEther(tokenValueEth); // Convert ETH to Wei
      const tokenMarketplace = "0x91b3D8F4d1256c79ec9e860e99F9f3415941f9C1"; // Marketplace contract address
      
      console.log("Approve Token Amount in Wei:", tokenValueWei);

      // Ensure the erc20 contract instance has a signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner(); // Get the signer
      const erc20ContractWithSigner = erc20ContractInstance.connect(signer); // Connect the contract to the signer

      // Approve token transfer
      const tx = await erc20ContractWithSigner.approve(tokenMarketplace, tokenValueWei);
      
      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log("Approval Receipt:", receipt);
      toast.success("Tokens Approved Successfully");
    } catch (error) {
      toast.error("Error: Approving Token");
      console.error("Approving Token Error:", error);
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
