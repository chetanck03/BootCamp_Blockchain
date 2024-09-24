import { ethers } from "ethers";
import abi from "../constant/abi.json";

export const getWeb3State = async () => {
    try {
        // MetaMask installation check
        if (!window.ethereum) {
            throw new Error("MetaMask is not installed");
        }

        // Request accounts
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
        const selectedAccount = accounts[0];

        // Get chainId of the blockchain
        const chainIdHex = await window.ethereum.request({
            method: 'eth_chainId'
        });
        const chainId = parseInt(chainIdHex, 16);

        // Create provider
        const provider = new ethers.BrowserProvider(window.ethereum); // Read in the blockchain

        // Get signer (user account for writing)
        const signer = await provider.getSigner(); // No `new` keyword needed

        // Contract instance
        const contractAddress = "0xa3C990Fd02daAd88F22f936dad1287F76f7c6f15";
        const contractInstance = new ethers.Contract(contractAddress, abi, signer);

        return { contractInstance, selectedAccount, chainId };

    } catch (error) {
        console.log(error);
        throw new Error(error.message); // Use Error() constructor, capitalize 'Error'
    }
};
