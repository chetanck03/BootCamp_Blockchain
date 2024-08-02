# ChetanToken

## OpenZeppelin: https://wizard.openzeppelin.com/#erc20](https://docs.openzeppelin.com/contracts/5.x/erc20
## Ethereum Sepolia Faucet: https://cloud.google.com/application/web3/faucet/ethereum/sepolia

ChetanToken is an ERC20-compliant token created using OpenZeppelin's ERC20 contract. This token has a custom decimal setting and is initialized with a specified initial supply.

## Overview

The `ChetanToken` contract inherits from OpenZeppelin's `ERC20` contract. It includes a constructor to set the initial supply and a function to override the default number of decimals.

## Key Points

- **SPDX License Identifier**: The contract is licensed under MIT.
- **Solidity Version**: The contract uses Solidity version 0.8.20.
- **Imports**: The contract imports the ERC20 implementation from OpenZeppelin.
- **Token Name and Symbol**: The token is named `ChetanToken` and has the symbol `CK`.
- **Initial Supply**: The initial supply of the token is specified during contract deployment and minted to the deployer's address.
- **Decimals**: The number of decimals is set to 10, overriding the default value.

## Code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ChetanToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("ChetanToken", "CK") {
        _mint(msg.sender, initialSupply);
    }

    function decimals() public pure override returns (uint8) {
        return 10;
    }
}
