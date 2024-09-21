// Function to handle account changes in MetaMask and update the web3 state
export const handleAccountChange = async (setWeb3State) => {
  
    // Request the list of accounts from MetaMask
    const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts' 
    });
    
    // Get the first account in the array (the selected account)
    const selectedAccount = accounts[0];
    
    // Update the web3State with the new selected account, while keeping other state values (like contractInstance and chainId) unchanged
    setWeb3State((prevState) => ({
        ...prevState, // Spread the previous state to retain contractInstance and chainId
        selectedAccount // Update only the selectedAccount field
    }));
};
