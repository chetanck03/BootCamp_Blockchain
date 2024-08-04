# Solidity Ether Transfer Methods

This repository contains an example Solidity contract demonstrating how to transfer Ether using the `transfer`, `send`, and `call` methods. Below are the key points for each method.

## Contract

The contract is located in `TransferExample.sol` and includes the following functions:

- `transferEther(address payable recipient)`: Transfers Ether using the `transfer` method.
- `sendEther(address payable recipient)`: Transfers Ether using the `send` method.
- `callEther(address payable recipient)`: Transfers Ether using the `call` method.

## Key Points

### `transfer`

- **Usage**: `recipient.transfer(amount);`
- **Gas Limit**: 2300 gas.
- **Error Handling**: Reverts on failure, so no need to check for success.
- **Security**: Safe from reentrancy attacks due to limited gas.
- **When to Use**: When you want a simple and safe way to send Ether, ensuring it fails if there's an issue.

### `send`

- **Usage**: `bool success = recipient.send(amount);`
- **Gas Limit**: 2300 gas.
- **Error Handling**: Returns a boolean indicating success (`true`) or failure (`false`).
- **Security**: Safe from reentrancy attacks due to limited gas.
- **When to Use**: When you want to handle the failure manually instead of reverting the transaction.

### `call`

- **Usage**: `(bool success, ) = recipient.call{value: amount}("");`
- **Gas Limit**: All available gas is sent unless specified.
- **Error Handling**: Returns a boolean indicating success (`true`) or failure (`false`).
- **Security**: Vulnerable to reentrancy attacks if not used carefully.
- **When to Use**: When you need to interact with other contracts or send Ether with a custom gas limit.

## Summary

- **transfer**: Simple, safe, and reverts on failure. Suitable for straightforward Ether transfers.
- **send**: Allows manual error handling, useful when you want to control the flow after a failed transfer.
- **call**: Most flexible but requires careful handling to avoid security issues like reentrancy attacks. Best for advanced use cases where interaction with other contracts is necessary.

## Usage

1. Deploy the `TransferExample` contract.
2. Use the respective function (`transferEther`, `sendEther`, `callEther`) to transfer Ether by sending a transaction with the payable amount.
3. Ensure the recipient address is payable.

For more details and examples, refer to the `TransferExample.sol` contract in this repository.
