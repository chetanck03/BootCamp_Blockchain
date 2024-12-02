# First Foundry Project

## Description
This is a simple example of a smart contract project using Foundry. It demonstrates the setup, compilation, and deployment of a smart contract using Foundry’s tools.

## Setup

To set up your Foundry project and deploy your smart contract, follow these steps:

1. **Initialize the project:**
   Run the following command to initialize the project. The `--force` flag overwrites any existing files.

   ```bash
   forge init --force
   ```
2. **Compile the smart contract:** Compile your smart contracts using the forge compile command.
   
   ```
   forge compile
   ```

3. **Start Anvil (local Ethereum node):** Anvil is a `local Ethereum` node for testing and deploying smart contracts.   
  
   ```
    anvil
   ```

4. **Run the deployment script (with private key):** Use the following command to deploy your contract to the local Ethereum network `(http://127.0.0.1:8545)`. Replace the `private key` with your own to sign the transaction.  

    ```
    forge script script/Counter.s.sol --rpc-url http://127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
    ```

5. **Broadcast the deployment:** After testing the deployment, you can `broadcast` the script to the network using the following command:  
   ```
   forge script script/Counter.s.sol --rpc-url http://127.0.0.1:8545 --broadcast --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

# Private Key Management via Foundry

To securely import and manage your private key in Foundry, follow these steps:

## 1. Import Your Private Key

Run the following command to import your private key into Foundry. The `--interactive` flag will prompt you for the password to secure your private key in the keystore.

```bash
cast wallet import defaultKey --interactive
```

## 2. Enter Your Private Key and Password
When prompted, enter your private key and a password for the keystore. Foundry will securely store the `private key` and associate it with the `defaultKey` wallet.

```
Enter private key:
Enter password:
`defaultKey` keystore was saved successfully. Address: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
```

## 3. Run the Deployment Script Using the Imported Key

Once the private key is imported and stored, use the `defaultKey` wallet to deploy the smart contract. The following command will execute the deployment script using the specified wallet.

```
forge script script/Counter.s.sol --rpc-url http://127.0.0.1:8545 --account defaultKey --sender 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 --broadcast
```

