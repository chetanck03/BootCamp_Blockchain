export const handleChainChange = async (setWeb3State) => {

    // Request the current chain ID from MetaMask
    const chainIdHex = await window.ethereum.request({
        method: 'eth_chainId' 
    });

    // Convert the chain ID from hexadecimal to a decimal number
    const chainId = parseInt(chainIdHex, 16);

    // Update the web3State with the new chain ID, while keeping other state values (like selectedAccount and contractInstance) unchanged
    setWeb3State((prevState) => ({
        ...prevState, // Spread the previous state to retain selectedAccount and contractInstance
        chainId // Update only the chainId field
    }));
};
