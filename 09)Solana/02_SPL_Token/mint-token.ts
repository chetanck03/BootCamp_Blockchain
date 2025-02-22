import { mintTo } from "@solana/spl-token";
import "dotenv/config";
import {
    getExplorerLink,
    getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

// Connect to the Solana Devnet
const connection = new Connection(clusterApiUrl("devnet"));

// Define token decimals (e.g., 2 decimal places = 10^2)
const DECIMALS = Math.pow(10, 2);

// Load the user's keypair securely from the environment file
const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`🔑 Loaded Keypair! Public Key: ${user.publicKey.toBase58()}`);

// Token mint account (replace with your actual mint address)
const tokenMintAccount = new PublicKey("2A75i4eZDSjyJX538upCt1bvVrm3DSqjsGRUkpabRxYv");

// Associated token account of the recipient (should already exist)
// ✅ Token Account Created: 557CVsCgjXzTsmnkCVqH2bz817HcMYCc3SsYmbjhyRwm
const recipientTokenAccount = new PublicKey(
    "557CVsCgjXzTsmnkCVqH2bz817HcMYCc3SsYmbjhyRwm",
);

(async () => {
    try {
        console.log("⏳ Minting tokens...");

        // Mint 10 tokens (adjust based on decimals)
        const transactionSignature = await mintTo(
            connection,
            user, // Payer
            tokenMintAccount, // Token Mint
            recipientTokenAccount, // Recipient's Associated Token Account
            user, // Mint authority
            10 * DECIMALS, // Amount to mint
        );

        // Generate a transaction link for verification
        const explorerLink = getExplorerLink("transaction", transactionSignature, "devnet");
        console.log(`✅ Success! Minted tokens. Transaction: ${explorerLink}`);
    } catch (error) {
        console.error("❌ Error minting tokens:", error);
    }
})();

// npx esrun mint-token.ts

// 🔑 Loaded Keypair! Public Key: Eq6ZkB5vVKy28JU4jmsdx8wXstD9xsMiUPb92sqftvzn
// ⏳ Minting tokens...
// ✅ Success! Minted tokens. Transaction: https://explorer.solana.com/tx/3eDMZegJAhcCnWDtSGvsMfaCw5iU9ezWYgGaPXRuKDgd9dLx6yCMsMpZ2SVpSuhiY3EVgPK7U1uDQd2EMUKDwKZC?cluster=devnet