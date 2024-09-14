# DApp Voting Application

## 1. Setup Project

To set up the DApp Voting Application, follow these steps:

1. **Create a new Vite project**:
   ```bash
   npm create-vite@latest
   ```

2. **Install Ethers.js:**:   
   ```bash
   npm i ethers
   ```
Ethers.js is a library for interacting with the Ethereum blockchain, which is used for connecting to Ethereum wallets and interacting with smart contracts.

## 2. Constant Folder
In the `constant` folder, create a file named `abi.json`. This file should contain the ABI (Application Binary Interface) of the voting smart contract. The ABI is a JSON representation of the contract's methods and events and is necessary for interacting with the smart contract from your application.

## 3. Context Folder
The `context folder` is used in React for managing global state across the application using the Context API. This helps avoid prop drilling (passing props through multiple layers of components) and simplifies state management by allowing components to access shared data directly.

### How to Use:
1. Create a context file (e.g., `Web3Context.jsx`) to provide and consume Web3-related state throughout your app.

2. Wrap your app with the context provider to make the state accessible to child components,like `Web3Provider.jsx`.

## 4. Utils Folder
Create `utility` files in the utils folder to manage Web3 state and handle events:

1. `getWeb3State.jsx`: A utility to connect to the wallet and fetch Web3 state (contract instance, selected account, and chain ID).

2. `handleAccountChange.jsx`: A utility to handle account changes and update the Web3 state.

3. `handleChainChange.jsx`: A utility to handle chain (network) changes and update the Web3 state.