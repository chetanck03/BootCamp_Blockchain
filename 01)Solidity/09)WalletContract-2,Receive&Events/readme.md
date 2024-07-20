# Wallet Smart Contract

## Overview

The `Wallet` smart contract allows an owner to manage and transfer Ether within the contract. It includes functionality for depositing, transferring, and withdrawing Ether, as well as checking balances.

## Features

1. **Ownership:**
   - The contract has a single owner who is set at the time of contract deployment.
   - Only the owner can execute specific functions like transferring Ether from the contract.

2. **Events:**
   - `Transfer`: Emitted when Ether is transferred from the contract to a user.
   - `Receive`: Emitted when Ether is received by the contract.

3. **Functions:**
   - **`contractAddEth`**: Allows anyone to send Ether to the contract.
   - **`transferEther`**: Allows the owner to transfer a specified amount of Ether to a user.
   - **`withdraw`**: Allows anyone to withdraw a specified amount of Ether from the contract.
   - **`contractBalance`**: Returns the current balance of the contract.
   - **`transferEthUserAccount`**: Allows anyone to transfer Ether to another user from their own account balance within the contract.
   - **`receiveFromUser`**: Allows the owner to receive Ether directly from a user.
   - **`getOwnerBalance`**: Returns the current balance of the owner's address.

4. **Special Functions:**
   - **`receive`**: A fallback function to accept Ether sent to the contract without any extra data.
   - **`fallback`**: A fallback function called when a non-existent function is called on the contract.

