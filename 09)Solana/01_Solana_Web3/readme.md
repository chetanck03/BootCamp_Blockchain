# Solana Web3.js Overview

This project demonstrates how to interact with the Solana blockchain using `@solana/web3.js`. It includes functionalities for creating a wallet, checking balances, and transferring SOL tokens.

## Setup Web3

To get started, set up your Node.js project and install the required dependencies:

```sh
npm init -y
npm install @solana/web3.js
```

## Project Structure

The project consists of three main files:

1. **`keypair.js`** - Generates a new Solana wallet (keypair).
2. **`balance.js`** - Retrieves and displays the SOL balance of a given wallet.
3. **`transfer.js`** - Sends SOL from one wallet to another.

## Usage

### 1. Generate a New Wallet (`keypair.js`)

This script creates a new wallet (keypair) and displays its public and secret keys.

```js
import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();
console.log("Public Key:", keypair.publicKey.toBase58());
console.log("Secret Key:", keypair.secretKey);
```

### 2. Check Wallet Balance (`balance.js`)

This script fetches and displays the balance of a Solana wallet.

```js
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const publicKey = new PublicKey("YOUR_WALLET_PUBLIC_KEY");

const getBalance = async () => {
    const balance = await connection.getBalance(publicKey);
    console.log("Balance in SOL:", balance / LAMPORTS_PER_SOL);
};

getBalance();
```

### 3. Transfer SOL (`transfer.js`)

This script transfers SOL from a sender wallet to a receiver wallet.

```js
import { Connection, Transaction, PublicKey, SystemProgram, sendAndConfirmTransaction, Keypair } from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const senderKeypair = Keypair.fromSecretKey(Uint8Array.from([/* Your Secret Key Array */]));
const receiverPubKey = new PublicKey("RECEIVER_WALLET_PUBLIC_KEY");

const sendSol = async () => {
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: senderKeypair.publicKey,
            toPubkey: receiverPubKey,
            lamports: 1000000 // 0.001 SOL
        })
    );
    transaction.feePayer = senderKeypair.publicKey;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);
    console.log("✅ Transaction Successful! Signature:", signature);
};

sendSol();
```

## Running the Scripts

Execute the scripts using Node.js:

```sh
node keypair.js   # Generate a new wallet
node balance.js   # Check wallet balance
node transfer.js  # Transfer SOL between wallets
```

## Notes
- Ensure you have enough SOL in your sender wallet before attempting a transfer.
- Use [Solana Faucet](https://solfaucet.com/) to get free SOL for testing on the Devnet.
- Always keep your secret key secure and never share it publicly.

This project provides a basic understanding of how to interact with Solana using `@solana/web3.js`. 🚀
