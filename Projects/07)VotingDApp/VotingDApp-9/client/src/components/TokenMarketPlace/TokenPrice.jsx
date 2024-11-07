import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const TokenPrice = ({ contractInstance }) => {
  const [tokenPrice, setTokenPrice] = useState(null); // Initial state set to null for loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokenPrice = async () => {
      try {
        if (!contractInstance) return; // Guard clause to ensure contractInstance is available

        // Fetch the token price directly from the contract
        const price = await contractInstance.tokenPrice();
        const priceEth = ethers.formatEther(price); // Format the price from Wei to Ether
        setTokenPrice(priceEth);
      } catch (error) {
        toast.error("Error: Fetching Token Price");
        console.error(error);
      } finally {
        setLoading(false); // Stop loading once done
      }
    };

    if (contractInstance) {
      fetchTokenPrice(); // Initial fetch of token price
      const intervalId = setInterval(fetchTokenPrice, 3000); // Fetch every 3 seconds

      // Cleanup the interval when the component is unmounted or dependencies change
      return () => clearInterval(intervalId);
    }
  }, [contractInstance]);

  return (
    <div className="flex flex-col items-center justify-between bg-gray-700 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-medium mb-2 text-blue-400">Current Token Price:</h2>
      <p className="text-2xl font-bold text-white">
        {loading ? "Loading..." : `${tokenPrice} ETH`}
      </p>
    </div>
  );
};

export default TokenPrice;
