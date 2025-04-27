# Automated Market Maker (AMM) Smart Contract

This repository contains a simple implementation of an Automated Market Maker (AMM) smart contract on Ethereum. The contract enables decentralized token swapping and liquidity provision without the need for traditional order books.

## Overview

This AMM implements a constant product formula (x * y = k) similar to Uniswap V2. It allows users to:

1. Provide liquidity for token pairs
2. Remove liquidity
3. Swap between tokens with a 0.3% trading fee

## Key Components

### Token Interface

The contract uses an `IERC20` interface to interact with ERC20 tokens.

### State Variables

- `tokenA` and `tokenB`: The two ERC20 tokens managed by this AMM
- `reserveA` and `reserveB`: The current reserves of each token
- `totalLPShares`: Total liquidity provider shares
- `shares`: Mapping of addresses to their LP shares

### Core Functions

#### Liquidity Management

- `add_liquidity(uint _amtA, uint _amtB)`: Allows users to provide liquidity by depositing both tokens
  - For the first liquidity provider, shares = sqrt(amtA * amtB)
  - For subsequent providers, shares are proportional to contribution relative to existing reserves
  
- `remove_liquidity(uint _shares)`: Allows users to withdraw their proportional share of the token reserves

#### Trading

- `swap(address _token, uint _amt)`: Enables token swaps with a 0.3% fee
  - Uses the constant product formula (x * y = k) to determine exchange rates
  - Fee is subtracted from the input amount (0.3%)

#### Helper Functions

- `_mint` and `_burn`: Internal functions to manage LP tokens
- `_update`: Updates token reserves after operations
- `_sqrt`: Calculates square root for initial share calculation
- `_min`: Returns the minimum of two values

## Mathematical Model

This AMM uses the constant product formula where:
- reserveA * reserveB = constant (k)
- After a swap: (reserveA + amountIn * 0.997) * (reserveB - amountOut) = k

The 0.3% fee is collected by reducing the effective input amount, keeping it in the reserves to benefit liquidity providers.
