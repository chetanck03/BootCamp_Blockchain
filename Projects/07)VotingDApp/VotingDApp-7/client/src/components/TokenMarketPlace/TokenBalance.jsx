import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useWeb3Context } from "../../context/useWeb3Context";

const TokenBalance = ({ erc20ContractInstance }) => {
  const { web3State } = useWeb3Context();
  const { selectedAccount } = web3State;
  const [userTokenBalance, setUserTokenBalance] = useState(null);

  useEffect(() => {
    const fetchTokenBalance = async () => {
      try {
        if (!selectedAccount) return; // Guard clause to ensure selectedAccount is available
        
        const tokenBalanceWei = await erc20ContractInstance.balanceOf(selectedAccount);
        const tokenBalanceEth = ethers.formatEther(tokenBalanceWei); // Use utils to format
        setUserTokenBalance(tokenBalanceEth);
      } catch (error) {
        toast.error("Error: Getting Token Balance");
        console.error(error);
      }
    };

    if (erc20ContractInstance && selectedAccount) {
      fetchTokenBalance(); // Only fetch balance when contract instance and account are available
    }
  }, [erc20ContractInstance, selectedAccount]);

  return (
    <div className="flex flex-col items-center justify-between bg-gray-700 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-medium mb-2 text-blue-400">Your Token Balance:</h2>
      <p className="text-2xl font-bold text-white">
      {userTokenBalance !== null ? `${userTokenBalance} CK Tokens` : "Loading..."}
      </p>
    </div>
  );
};

export default TokenBalance;
