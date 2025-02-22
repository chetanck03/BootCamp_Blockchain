import { createMint } from "@solana/spl-token";
import "dotenv/config";
import {
    getKeypairFromEnvironment,
    getExplorerLink
} from "@solana-developers/helpers";

import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

// ✅ Ensure we are using Solana Devnet
const connection = new Connection(clusterApiUrl("devnet"));

// ✅ Get the user's keypair from the environment variable
const user = getKeypairFromEnvironment("SECRET_KEY");

async function main() {
    try {
        // ✅ Check wallet balance before proceeding
        const balance = await connection.getBalance(user.publicKey);
        console.log(`💰 Wallet Balance: ${balance / LAMPORTS_PER_SOL} SOL`);

        // ✅ Ensure at least 1.5 SOL for transaction fees
        if (balance < 1.5 * LAMPORTS_PER_SOL) {
            console.error("❌ Not enough SOL! Please airdrop at least 2 SOL.");
            console.log(`Run: solana airdrop 2 ${user.publicKey.toBase58()}`);
            return;
        }

        // ✅ Create the token mint
        const tokenMint = await createMint(connection, user, user.publicKey, null, 2);
        const link = getExplorerLink("address", tokenMint.toString(), "devnet");

        console.log(`✅ Token Mint Created Successfully!`);
        console.log(`🔗 View on Solana Explorer: ${link}`);
    } catch (error) {
        console.error("🚨 Error creating token mint:", error);
    }
}

// Run the main function
main();


//command to run  - npx esrun create-token-mint.ts
// 🔗 View on Solana Explorer: https://explorer.solana.com/address/2A75i4eZDSjyJX538upCt1bvVrm3DSqjsGRUkpabRxYv?cluster=devnet

// Token Mint Address : 2A75i4eZDSjyJX538upCt1bvVrm3DSqjsGRUkpabRxYv