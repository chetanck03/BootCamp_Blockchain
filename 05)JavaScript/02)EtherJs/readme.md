# Ether.js Setup and Smart Contract Interaction

## Overview

This guide provides a quick setup for using Ether.js, a JavaScript library for interacting with the Ethereum blockchain. You'll learn how to connect to the blockchain, check account balances, and interact with smart contracts.

## Key Points

- **Ether.js:** A powerful library for interacting with Ethereum.
- **Setup:** Step-by-step instructions to initialize a project with Ether.js.
- **Blockchain Connection:** How to connect to the Ethereum blockchain and check balances.
- **Smart Contract Interaction:** Reading and writing to Ethereum smart contracts.

## Setup Ether.js

1. **Initialize your project:**
    ```bash
    npm init -y
    ```

2. **Install Ether.js:**
    - Documentation: [Getting Started with Ether.js](https://docs.ethers.org/v6/getting-started/)
    ```bash
    npm install ethers
    ```

3. **Create a file `blockchainConnection.js`:**
    - Use this file to connect to the Ethereum blockchain and check the balance of Ethereum accounts.

4. **Check the balance of Ethereum accounts:**
    - Get the account address here: [Clank Ethereum Address](https://clankapp.com/ethereum)

5. **Run the file:**
    ```bash
    node blockchainConnection.js
    ```

## Interact with Smart Contracts

1. **Create a file `readValueContract.js`:**
    - Use this file to interact with a smart contract on Ethereum via RPC (Remote Procedure Call) public node: [Sepolia RPC Node](https://ethereum-sepolia.publicnode.com/)

2. **Create an `abi.json` file:**
    - This file contains the ABI (Application Binary Interface) details of the smart contract.

3. **Create a file `writeValueContract.js`:**
    - Similar to `readValueContract.js`, but this file will be used for writing data to the smart contract.
