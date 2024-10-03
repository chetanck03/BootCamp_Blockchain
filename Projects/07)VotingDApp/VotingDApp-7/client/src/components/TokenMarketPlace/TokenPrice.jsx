import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const TokenPrice = ({ contractInstance }) => {
  const [tokenPrice, setTokenPrice] = useState(null); // Changed to null for loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokenPrice = async () => {
      try {
        if (!contractInstance) return; // Guard clause to ensure contractInstance is available

        // Fetch the token price directly from the contract
        const price = await contractInstance.tokenPrice();
        console.log(price)
        const priceEth =  ethers.formatEther(price); // Format the price from Wei to Ether
        console.log(priceEth)
        setTokenPrice(priceEth);
      } catch (error) {
        toast.error("Error: Fetching Token Price");
        console.error(error);
      } finally {
        setLoading(false); // Stop loading once done
      }
    };

    fetchTokenPrice(); // Call the function directly
  }, [contractInstance]);

  return (
    <div className="flex flex-col items-center justify-between bg-gray-700 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-medium mb-2 text-blue-400">Current Token Price:</h2>
      {/* {loading ? (
        <p className="text-lg text-white">Loading...</p>
      ) : (
      )} */}
      <p className="text-2xl font-bold text-white">
      {tokenPrice !== null ? `${tokenPrice} Eth` : "Loading..."}
        </p>
    </div>
  );
};

export default TokenPrice;
