# Upgradable Proxy Smart Contract Project

This project demonstrates the implementation of an upgradable smart contract using the Hardhat framework and OpenZeppelin's upgradeable contract utilities. We deploy the initial version of the contract and then upgrade it to a new version.

## Project Structure

### 1) Setup

1. **Initialize NPM:**
    ```bash
    npm init -y
    ```
2. **Install Hardhat:**
    Follow the [Hardhat Getting Started Guide](https://hardhat.org/hardhat-runner/docs/getting-started) to set up the environment:
    ```bash
    npm install --save-dev hardhat
    ```

3. **Install OpenZeppelin Upgrades:**
    OpenZeppelin provides a robust library to create upgradable contracts. Install the required dependencies:
    ```bash
    npm install --save-dev @openzeppelin/hardhat-upgrades
    ```

### 2) Create a Project

1. **Initialize Hardhat:**
    ```bash
    npx hardhat
    ```

2. **Alchemy Setup:**
    To deploy contracts to the Sepolia testnet, create an Alchemy account and get your API key:
    - [Alchemy Dashboard](https://dashboard.alchemy.com/apps/02xa6muhbpqgb2nu/networks)

### 3) Configure Hardhat

1. **Update `hardhat.config.js`:**
    Add the Sepolia network configuration. Install `dotenv` to manage environment variables:
    ```bash
    npm install dotenv
    ```

    Update `hardhat.config.js`:
    ```javascript
    require('dotenv').config();

    module.exports = {
      networks: {
        sepolia: {
          url: process.env.ALCHEMY_API_KEY,
          accounts: [process.env.PRIVATE_KEY]
        }
      },
      solidity: "0.8.18",
    };
    ```

### 4) Environment Variables

1. **Create `.env` File:**
    Add your Sepolia Alchemy API key, wallet private key, and Etherscan API key:
    ```plaintext
    ALCHEMY_API_KEY=<your-alchemy-api-key>
    PRIVATE_KEY=<your-wallet-private-key>
    ETHERSCAN_API_KEY=<your-etherscan-api-key>
    ```

### 5) Deployment Scripts

1. **Deploy Initial Contract (v1):**
    Use the Hardhat script to deploy the initial version of the contract:
    ```bash
    npx hardhat run --network sepolia ./scripts/deploy_box_v1.js
    ```

2. **Deployed Contract Addresses:**
    - **Proxy Contract Address:** `0xf5E61564CFBcC6baB06B26a1C9151cbc1F1f7121`
    - **Implementation Contract Address:** `0xe40A320CBe79E20499E442c38019C63d918d9d4D`
    - **Admin Contract Address:** `0xdEe63783c33Df903dD9b1B5Cc1e141110F710CbE`

3. **Verify Proxy Contract:**
    Verify the proxy contract on Etherscan:
    ```bash
    npx hardhat verify --network sepolia 0xf5E61564CFBcC6baB06B26a1C9151cbc1F1f7121
    ```

### 6) Upgrading the Contract

1. **Deploy Upgrade Script (v2):**
    After making changes in the contract, deploy the upgraded version:
    ```bash
    npx hardhat run --network sepolia ./scripts/upgrade_box_v2.js
    ```

2. **Upgraded Implementation Address:**
    - **Upgraded Implementation Address:** `0x4Ad2e68272a0E764A4c77dE360E1711A17eD0Fa5`

3. **Verify Upgraded Contract:**
    Verify the upgraded contract on Etherscan:
    ```bash
    npx hardhat verify --network sepolia 0x4Ad2e68272a0E764A4c77dE360E1711A17eD0Fa5
    ```

## Additional Resources

- [OpenZeppelin Upgradeable Contracts](https://docs.openzeppelin.com/learn/upgrading-smart-contracts)
- [Hardhat Documentation](https://hardhat.org/hardhat-runner/docs/getting-started)
- [Alchemy API Dashboard](https://dashboard.alchemy.com)
- [Etherscan API](https://etherscan.io/myapikey)

## License

This project is licensed under the MIT License. See the LICENSE file for details.
