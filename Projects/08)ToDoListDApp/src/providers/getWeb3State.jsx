import { ethers } from "ethers";
import toast from "react-hot-toast";
import abi from "../contractsAbi/abi.json";

export const getWeb3State = async () => {
  try {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      toast.error("MetaMask is not installed. Please install it to use this feature.");
      throw new Error("MetaMask is not installed");
    }

    // Request account access from MetaMask
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const selectedAccount = accounts[0];

    // Get the current chain ID
    const chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
    const chainId = parseInt(chainIdHex, 16);

    // Create a provider and signer
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Set up the contract instance with ABI and signer
    const contractAddress = "0x258617f3624Af3c459f690230E73BFc94dabFFe1";
    const contractInstance = new ethers.Contract(contractAddress, abi, signer);
    console.log("contractAddress:" ,contractAddress,"\n", "abi:", abi,"signer:","\n", signer,"contractInstance: ","\n",contractInstance,"\n", "selectedAccount: ","\n",selectedAccount,"\n","chainId:", chainId )
    return { contractInstance, selectedAccount, chainId };
  } catch (error) {
    // Error handling and notification
    toast.error(`Error fetching Web3 state: ${error.message}`);
    console.error("Error fetching Web3 state:", error);
    throw new Error(error.message);
  }
};