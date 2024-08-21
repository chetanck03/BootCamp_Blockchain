# TokenMarketPlace Smart Contract

Chainlink Automation : https://automation.chain.link/

## Overview

The `TokenMarketPlace` smart contract is an Ethereum-based decentralized marketplace where users can buy and sell `CkToken` (an ERC-20 token). The contract also includes dynamic pricing based on the demand and supply of the tokens. The owner of the contract has privileges to withdraw tokens and Ether from the contract.

## Features

- **Dynamic Token Pricing**: The price of the token (`CkToken`) is adjusted automatically based on market demand, balancing the ratio of buyers to sellers.
- **Buy and Sell Tokens**: Users can buy tokens by sending Ether to the contract or sell tokens back to the marketplace to receive Ether.
- **Owner Privileges**: The contract owner can withdraw excess tokens and accumulated Ether from the contract.
- **Events**: Emits events for significant actions like buying and selling tokens, updating token price, and withdrawing tokens or Ether.

## Functions

### 1. `adjustTokenPriceBasedOnDemand()`
- **Internal**: Adjusts the price of the token based on the demand ratio between buyers and sellers.

### 2. `calculateTokenPrice(uint256 _amountOfToken)`
- **Public**: Calculates the total cost (in Ether) for purchasing a specific amount of tokens, adjusting the price based on current demand.

### 3. `buyCkToken(uint256 _amountOfToken)`
- **Public, Payable**: Allows a user to purchase tokens by sending the required amount of Ether. Any excess Ether sent will be refunded.

### 4. `sellCkToken(uint256 _amountOfToken)`
- **Public**: Allows a user to sell tokens back to the contract in exchange for Ether.

### 5. `withdrawTokens(uint256 _amount)`
- **Public, onlyOwner**: Allows the contract owner to withdraw excess tokens from the contract.

### 6. `withdrawEther(uint256 _amount)`
- **Public, onlyOwner**: Allows the contract owner to withdraw accumulated Ether from the contract.

## Events

- `TokenPriceUpdated(uint256 newPrice)`: Emitted when the token price is updated.
- `TokenBought(address indexed buyer, uint256 amount, uint256 totalCost)`: Emitted when tokens are bought from the marketplace.
- `TokenSold(address indexed seller, uint256 amount, uint256 totalEarned)`: Emitted when tokens are sold back to the marketplace.
- `TokensWithdrawn(address indexed owner, uint256 amount)`: Emitted when the owner withdraws tokens.
- `EtherWithdrawn(address indexed owner, uint256 amount)`: Emitted when the owner withdraws Ether.
- `CalculateTokenPrice(uint256 priceToPay)`: Emitted when the price for a specific token amount is calculated.

## Dependencies

- **OpenZeppelin Contracts**: Utilizes OpenZeppelin's `SafeERC20`, `SafeMath`, and `Ownable` contracts for secure and efficient operations.
- **Hardhat Console**: For logging output during development.

## Usage

1. **Deployment**: Deploy the contract by providing the address of the `CkToken` ERC-20 token contract.
2. **Buying Tokens**: Call `buyCkToken` with the desired amount of tokens and the appropriate Ether value.
3. **Selling Tokens**: Call `sellCkToken` with the amount of tokens to be sold.
4. **Owner Functions**: The owner can withdraw tokens or Ether from the contract using `withdrawTokens` and `withdrawEther`.

## License

This project is licensed under the MIT License.
