import { 
    Connection, 
    Transaction, 
    PublicKey, 
    SystemProgram, 
    sendAndConfirmTransaction, 
    Keypair 
} from "@solana/web3.js";

// 🔹 Connect to Solana Devnet
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// 🔹 Convert Secret Key to Keypair
const secretKey = Uint8Array.from([
    100, 138, 159,  16, 203,  17,  92, 158,  80, 229, 255,
     48,   9,  33, 139, 230,  27, 194,  46, 131,  63, 252,
    178, 185,  37, 141,  76,  17, 251,  47, 175, 214, 205,
    122,  25, 202,  95, 178, 113, 229, 183, 149, 212, 162,
    187,  82, 249, 177, 167, 150, 218, 101, 220, 119, 215,
    206, 135, 144,  46, 103,  65, 225,  24, 227
]);

const senderKeypair = Keypair.fromSecretKey(secretKey);
const senderPubKey = senderKeypair.publicKey; // Eq6ZkB5vVKy28JU4jmsdx8wXstD9xsMiUPb92sqftvzn
const receiverPubKey = new PublicKey("3tZXKYsVyH6q4brmjcUWMJnfG2zbUaURqCzFAne5Gh9t");

// 🔹 Check Wallet Balance
const checkBalance = async (pubKey) => {
    const balance = await connection.getBalance(pubKey);
    console.log(`Balance of ${pubKey.toBase58()} : ${balance / 1e9} SOL`);
    return balance;
};

// 🔹 Create & Send Transaction
const sendSol = async () => {
    try {
        // Check sender balance before sending
        const senderBalance = await checkBalance(senderPubKey);
        if (senderBalance < 0.0001 * 1e9) { 
            throw new Error("❌ Insufficient balance to send SOL and cover fees.");
        }

        // Create a transaction
        const transaction = new Transaction();

        // Add transfer instruction
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: senderPubKey,
                toPubkey: receiverPubKey,
                lamports: 1000000, // 🔹 Send 0.001 SOL (1,000,000 lamports)
            })
        );

        // Set fee payer and blockhash
        transaction.feePayer = senderPubKey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

        // 🔹 Sign & Send Transaction
        const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);
        console.log("✅ Transaction Successful! Signature:", signature);

    } catch (error) {
        console.error("❌ Transaction Failed!", error);
    }
};

// 🔹 Run Function
sendSol();


//  ✅ Transaction Successful! Signature: 4bQeHjt1peLerMFphtSB41aHaNyJi3UofL4u8xr6QV8G4J7qsrgHomRq6Ri7W8ScbyUR1hdkMQ3wdj7BVAwRDSUC