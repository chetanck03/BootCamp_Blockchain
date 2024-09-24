# Voting DApp Setup

## Overview

This guide will help you set up the Voting DApp project, which is built with React and Web3 to interact with a blockchain-based voting system. The project enables users to connect their MetaMask wallet, register candidates, and view voting results.

### Components

The project is divided into several components and folders, including:

1. **Navigation Component**  
   This is the header navigation menu to link between different routes of the application.

2. **DisplayResult & VotingStatus Components**  
   These components will display voting results and track the current voting status.

3. **Web3 Context**  
   This context manages the blockchain state and wallet connection across the application.

4. **Wallet Component**  
   This component handles connecting the user's MetaMask wallet.

5. **Voting Smart Contract**  
   The smart contract powers the DApp, registering candidates and fetching voting results.

---

## Setup

### 1. Navigation Component Setup
- Create a `Navigation` folder inside the `components` directory.
- Link this component to the `routes` folder to manage routing across different pages.

### 2. DisplayResult & VotingStatus Component Setup
- Inside the `components/ElectionCommission` directory, create two folders: `DisplayResult` and `VotingStatus`.
- These components will be used to display the voting results and track the status of the voting process.

### 3. Web3 Context Changes
- In the `Web3Provider` file, ensure the `Web3Context` provider passes `web3State` and `handleWallet` globally.
- Modify the context-related logic across all the components to ensure they have access to the global `web3State` and wallet handling.

```jsx 
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;
```
### 4. Wallet Component Setup
- Create a `Wallet` folder under the `components` directory.
- This component will be responsible for connecting the user's MetaMask wallet.

### 5. Voting DApp Smart Contract Deployment
- Deploy the smart contract using Remix IDE on the Sepolia test network.
- Save the contract address in the `utils` folder and update the `getWeb3State` file with the correct contract details.
- Now, you can register candidates through the frontend after connecting to the smart contract.

### 6. GetCandidateList on the Frontend
- Implement the `GetCandidateList` function in the frontend, formatting the data in a user-friendly way.
- Add this functionality to the `pages` folder where candidate details will be fetched and displayed.

---

By following the above steps, you'll successfully set up the Voting DApp project, allowing users to interact with the voting system and view results.
