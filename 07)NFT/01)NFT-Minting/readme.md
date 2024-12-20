# NFT Contract - Overview

This is an ERC-721 smart contract for managing and minting NFTs (Non-Fungible Tokens) with functionality for presale and public sale phases, along with secure payment splitting among team members.

## Features
1. **ERC-721 Compliant**: Implements the ERC-721 standard for NFTs.
2. **Presale and Public Sale**: Controlled minting phases with specific rules for each.
3. **Payment Splitting**: Uses OpenZeppelin's `PaymentSplitter` to distribute funds to team members.
4. **Merkle Proof Validation**: Ensures only eligible users can mint during the presale.
5. **Custom Token Metadata**: Assigns unique Content Identifiers (CIDs) for each minted token.
6. **Admin Controls**: Allows toggling of sale states and pausing the contract.
7. **Security Features**: Includes checks for reentrancy and contract call restrictions.

## Functionality

### Contract Initialization
- **`constructor(string memory initialBaseURI, bytes32 root)`**:
  Initializes the contract with a base token URI and a Merkle root for presale eligibility.

### Minting
- **`presaleMint(uint256 nftAmount, bytes32[] calldata proof, string[] calldata cids)`**:
  Allows eligible users to mint NFTs during the presale. Requires a valid Merkle proof, ETH payment, and a CID for each NFT.

- **`publicSaleMint(uint256 nftAmount, string[] calldata cids)`**:
  Allows users to mint NFTs during the public sale. Requires ETH payment and a CID for each NFT.

### Token Metadata
- **`tokenURI(uint256 tokenId)`**:
  Returns the metadata URI for a specific token by combining the base URI and the token's CID.

### Contract State Controls
- **`togglePause()`**: Pauses or unpauses the contract.
- **`togglePresale()`**: Enables or disables the presale phase.
- **`togglePublicSale()`**: Enables or disables the public sale phase.

### Payment and Withdrawals
- **`withdrawFunds()`**: Allows the owner to withdraw the contract's balance.
- **`PaymentSplitter`**: Automatically splits incoming payments among predefined team members.

### Utility Functions
- **`totalSupply()`**: Returns the total number of minted NFTs.
- **`setBaseTokenURI(string memory newBaseURI)`**: Updates the base URI for token metadata.

### Security
- **Modifiers**:
  - `onlyEOA`: Ensures only externally owned accounts (EOAs) can call specific functions.
  - `isValidProof`: Validates a Merkle proof for presale participation.

## Constants
- **`PRESALE_LIMIT`**: Maximum NFTs an address can mint during presale (5).
- **`MAX_SUPPLY`**: Maximum total supply of NFTs (20).
- **`TOKEN_PRICE`**: Price per NFT (0.000001 Ether).

## Payment Distribution
The contract uses the `PaymentSplitter` module to allocate payments among team members as follows:
- Address 1: 20%
- Address 2: 30%
- Address 3: 50%

## Requirements
- Valid ETH payment for minting.
- Matching number of `cids` with the requested mint amount.
- Adherence to presale eligibility and limits.

## How to Use
1. Deploy the contract with an initial base URI and a Merkle root for presale.
2. Toggle presale or public sale states as needed.
3. Mint tokens by calling the appropriate mint function with required arguments.
4. Withdraw funds or allow automatic payment splitting as needed.

## Notes
- The contract is secured against reentrancy attacks.
- Only the contract owner can modify states or withdraw funds.
