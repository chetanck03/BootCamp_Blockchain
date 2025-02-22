// This script uses "@metaplex-foundation/mpl-token-metadata@2" to create a metadata account for an SPL token on Solana.

import "dotenv/config";
import {
    getKeypairFromEnvironment,
    getExplorerLink,
} from "@solana-developers/helpers";
import {
    Connection,
    clusterApiUrl,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
} from "@solana/web3.js";
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

// ✅ Load user's keypair securely from environment variables
const user = getKeypairFromEnvironment("SECRET_KEY");

// ✅ Connect to the Solana Devnet cluster
const connection = new Connection(clusterApiUrl("devnet"));

console.log(`🔑 Keypair loaded! Public Key: ${user.publicKey.toBase58()}`);

// ✅ Metaplex Token Metadata Program ID (DO NOT CHANGE)
const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

// ✅ Substitute your token mint account (Update this with your own mint address)
const tokenMintAccount = new PublicKey("2A75i4eZDSjyJX538upCt1bvVrm3DSqjsGRUkpabRxYv");

// ✅ Metadata details for the token
const metadataData = {
    name: "Ck Tech Hub Token",   // Token Name
    symbol: "CKHT",              // Token Symbol
    uri: "https://green-general-donkey-112.mypinata.cloud/ipfs/bafkreihgrwvyfysn5bnfra4mowtjyyao5ghixmj6scda2d4prrqfx2e55a", // IPFS/Arweave metadata JSON link
    sellerFeeBasisPoints: 0,     // 0% creator fee
    creators: null,              // No creators set
    collection: null,            // Not part of any collection
    uses: null,                  // No special usage
};

// ✅ Derive Metadata PDA (Program Derived Address) for the token mint
const [metadataPDA] = PublicKey.findProgramAddressSync(
    [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenMintAccount.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
);

console.log(`📍 Metadata PDA: ${metadataPDA.toBase58()}`);

// ✅ Create a transaction for setting up token metadata
const transaction = new Transaction();

// ✅ Create instruction for setting metadata
const createMetadataAccountInstruction = createCreateMetadataAccountV3Instruction(
    {
        metadata: metadataPDA,
        mint: tokenMintAccount,
        mintAuthority: user.publicKey,
        payer: user.publicKey,
        updateAuthority: user.publicKey,
    },
    {
        createMetadataAccountArgsV3: {
            collectionDetails: null,
            data: metadataData,
            isMutable: true,  // Metadata can be updated in the future
        },
    }
);

// ✅ Add instruction to the transaction
transaction.add(createMetadataAccountInstruction);

(async () => {
    try {
        // ✅ Send and confirm the transaction
        const transactionSignature = await sendAndConfirmTransaction(connection, transaction, [user]);

        // ✅ Explorer links for easy verification
        console.log(`✅ Transaction confirmed: ${getExplorerLink("transaction", transactionSignature, "devnet")}`);
        console.log(`✅ Token Mint Explorer Link: ${getExplorerLink("address", tokenMintAccount.toString(), "devnet")}`);
    } catch (error) {
        console.error("🚨 Error creating metadata account:", error);
    }
})();

// npx esrun create-token-metadata.ts

// Keypair loaded! Public Key: Eq6ZkB5vVKy28JU4jmsdx8wXstD9xsMiUPb92sqftvzn
// 📍 Metadata PDA: 89QK3NF6i2FfUcpMRkFGj1aNKacgt2MUuXbN8xzetGrF
// ✅ Transaction confirmed: https://explorer.solana.com/tx/5nu7fwxLNUZJpCdQDE8N2en6TRycjY1ruBjrNeyU2ze1tDuLDz6twfwpjVtY6uybGutsrgEcPCtvqNPsLoVqvRJE?cluster=devnet
// ✅ Token Mint Explorer Link: https://explorer.solana.com/address/2A75i4eZDSjyJX538upCt1bvVrm3DSqjsGRUkpabRxYv?cluster=devnet