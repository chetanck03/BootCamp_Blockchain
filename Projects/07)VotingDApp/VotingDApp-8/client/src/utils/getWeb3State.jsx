import { ethers } from "ethers";
import abi from "../constant/abi.json";
import axios from "axios"

export const getWeb3State = async () => {
    try {
        if (!window.ethereum) {
            throw new Error("MetaMask is not installed");
        }

        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
        const selectedAccount = accounts[0];

        const chainIdHex = await window.ethereum.request({
            method: 'eth_chainId'
        });
        const chainId = parseInt(chainIdHex, 16);

        // Mapping chainId to network name
        let networkName = '';
        switch (chainId) {
            case 1:
                networkName = 'Ethereum Mainnet';
                break;
            case 3:
                networkName = 'Ropsten Test Network';
                break;
            case 4:
                networkName = 'Rinkeby Test Network';
                break;
            case 5:
                networkName = 'Goerli Test Network';
                break;
            case 42:
                networkName = 'Kovan Test Network';
                break;
            case 56:
                networkName = 'Binance Smart Chain';
                break;
            case 137:
                networkName = 'Polygon Mainnet';
                break;
            case 80001:
                networkName = 'Polygon Mumbai Test Network';
                break;
            case 11155111:
                networkName = 'Sepolia Test Network';
                break;
            case 17000:
                networkName = 'Ethereum Holesky Testnet';
                break;
            // Add more networks as needed
            default:
                networkName = 'Unknown Network';
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contractAddress = "0x1FeA3eb1D7Bb6f98EF480D4b308b1bB725c53675";

        const message = "Welcome to Voting Dapp. You accept our terms and condition";
        const signature = await signer.signMessage(message);
        const dataSignature = { signature };
        const res = await axios.post(`http://localhost:3000/api/authentication?accountAddress=${selectedAccount}`, dataSignature);
        localStorage.setItem("token", res.data.token);

        const contractInstance = new ethers.Contract(contractAddress, abi, signer);
        
        return { contractInstance, selectedAccount, chainId, networkName ,signer,provider}; // Return networkName here

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};
