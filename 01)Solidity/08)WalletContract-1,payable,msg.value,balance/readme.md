# Wallet Smart Contract

## Overview

This Solidity smart contract represents a basic wallet that allows the owner to manage and transfer Ether. The key functionalities include depositing Ether into the contract, transferring Ether from the contract to a user, withdrawing Ether from the contract, and checking balances.

## Features

1. **Owner Management**:
   - The contract initializes the deployer as the owner.
   - Functions that modify the contract's state are restricted to the owner using the `onlyOwner` modifier.

2. **Deposit Ether**:
   - Users can transfer Ether to the contract using the `contractAddEth` function.

3. **Transfer Ether from Contract**:
   - The owner can transfer a specified amount of Ether from the contract to a user using the `transferEther` function.
   - Users can transfer Ether from the contract to another user using the `transferEthUserAccount` function.

4. **Withdraw Ether**:
   - Any user can withdraw a specified amount of Ether from the contract using the `withdraw` function.

5. **Balance Checks**:
   - The contract balance can be checked using the `contractBalance` function.
   - The owner's balance can be checked using the `getOwnerBalance` function.

6. **Receive Ether**:
   - The owner can receive Ether from a user using the `receiveFromUser` function.

7. **Fallback Function**:
   - The fallback function sets a message when it is called without data.

