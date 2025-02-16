// Keypair : 
// when you create a new wallet or account on Solana. It allows you to send, receive, and sign transactions securely on the blockchain.
import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate()

// console.log("Keypair:",keypair)
console.log("Public Key:",keypair.publicKey.toBase58())
console.log("Secret Key:",keypair.secretKey)