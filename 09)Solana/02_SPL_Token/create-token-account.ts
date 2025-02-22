import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import "dotenv/config";
import { 
    getExplorerLink, 
    getKeypairFromEnvironment 
} from "@solana-developers/helpers";
import { 
    Connection, 
    PublicKey, 
    clusterApiUrl 
} from "@solana/web3.js";

// Establish connection to Solana Devnet
const connection = new Connection(clusterApiUrl("devnet"));

// Load the user's keypair from environment variables
const user = getKeypairFromEnvironment("SECRET_KEY");
console.log(`🔑 Loaded Keypair! Public Key: ${user.publicKey.toBase58()}`);

// Replace this with your token mint account
const tokenMintAccount = new PublicKey("2A75i4eZDSjyJX538upCt1bvVrm3DSqjsGRUkpabRxYv");

// Specify recipient (can be yourself or another wallet)
const recipient = user.publicKey; // Replace with another PublicKey if needed

(async () => {
    try {
        // Create or fetch the associated token account (ATA)
        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            user,
            tokenMintAccount,
            recipient
        );

        console.log(`✅ Token Account Created: ${tokenAccount.address.toBase58()}`);

        // Generate a Solana Explorer link
        const link = getExplorerLink("address", tokenAccount.address.toBase58(), "devnet");
        console.log(`🔗 View on Explorer: ${link}`);
    } catch (error) {
        console.error("❌ Error creating token account:", error);
    }
})();


// npx esrun create-token-account.ts
// 🔑 Loaded Keypair! Public Key: Eq6ZkB5vVKy28JU4jmsdx8wXstD9xsMiUPb92sqftvzn
// ✅ Token Account Created: 557CVsCgjXzTsmnkCVqH2bz817HcMYCc3SsYmbjhyRwm
// 🔗 View on Explorer: https://explorer.solana.com/address/557CVsCgjXzTsmnkCVqH2bz817HcMYCc3SsYmbjhyRwm?cluster=devnet