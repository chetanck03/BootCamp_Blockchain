# SPL (Solana Program Library) Token on Solana

This project demonstrates how to create, configure, and manage a Solana SPL token using the `@solana/spl-token` package. It includes steps to:
- Set up the Solana environment
- Create a new token mint
- Assign metadata to the token
- Create a token account
- Mint tokens to an associated account

## Prerequisites
Before running the scripts, ensure you have:
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli) installed.
- Node.js and `npx` installed.
- A funded Solana wallet configured.

## 1️⃣ Set Solana Configuration
```sh
solana config set --url https://api.devnet.solana.com
```
This sets up the Solana CLI to interact with the Devnet.

## 2️⃣ Create a Token Mint
```sh
npx esrun create-token-mint.ts
```
**Example Output:**
```
💰 Wallet Balance: 4.998995 SOL
✅ Token Mint Created Successfully!
🔗 View on Solana Explorer: https://explorer.solana.com/address/2A75i4eZDSjyJX538upCt1bvVrm3DSqjsGRUkpabRxYv?cluster=devnet
Token Mint Address: 2A75i4eZDSjyJX538upCt1bvVrm3DSqjsGRUkpabRxYv
```
This script creates a new token mint, which is the main entity responsible for minting tokens.

## 3️⃣ Add Token Metadata
```sh
npx esrun create-token-metadata.ts
```
**Example Output:**
```
Keypair loaded! Public Key: Eq6ZkB5vVKy28JU4jmsdx8wXstD9xsMiUPb92sqftvzn
📍 Metadata PDA: 89QK3NF6i2FfUcpMRkFGj1aNKacgt2MUuXbN8xzetGrF
✅ Transaction confirmed: https://explorer.solana.com/tx/5nu7fwxLNUZJpCdQDE8N2en6TRycjY1ruBjrNeyU2ze1tDuLDz6twfwpjVtY6uybGutsrgEcPCtvqNPsLoVqvRJE?cluster=devnet
✅ Token Mint Explorer Link: https://explorer.solana.com/address/2A75i4eZDSjyJX538upCt1bvVrm3DSqjsGRUkpabRxYv?cluster=devnet
```
This script sets up metadata (such as name and symbol) for the token.

## 4️⃣ Create an Associated Token Account
```sh
npx esrun create-token-account.ts
```
**Example Output:**
```
🔑 Loaded Keypair! Public Key: Eq6ZkB5vVKy28JU4jmsdx8wXstD9xsMiUPb92sqftvzn
✅ Token Account Created: 557CVsCgjXzTsmnkCVqH2bz817HcMYCc3SsYmbjhyRwm
🔗 View on Explorer: https://explorer.solana.com/address/557CVsCgjXzTsmnkCVqH2bz817HcMYCc3SsYmbjhyRwm?cluster=devnet
```
Each user receiving tokens must have an associated token account to hold them.

## 5️⃣ Mint Tokens to the Token Account
```sh
npx esrun mint-token.ts
```
**Example Output:**
```
🔑 Loaded Keypair! Public Key: Eq6ZkB5vVKy28JU4jmsdx8wXstD9xsMiUPb92sqftvzn
⏳ Minting tokens...
✅ Success! Minted tokens. Transaction: https://explorer.solana.com/tx/3eDMZegJAhcCnWDtSGvsMfaCw5iU9ezWYgGaPXRuKDgd9dLx6yCMsMpZ2SVpSuhiY3EVgPK7U1uDQd2EMUKDwKZC?cluster=devnet
```
This script mints a specified number of tokens to a recipient’s associated token account.

---
### 🛠 **Troubleshooting**
- **TokenAccountNotFoundError:** Ensure you have created an associated token account before minting tokens.
- **NotEnoughSOL:** Make sure your wallet has enough SOL for transaction fees (`solana airdrop 1` if using Devnet).

### 📌 **Next Steps**
- Transfer tokens between accounts.
- Implement a custom frontend to interact with the token.
- Deploy the token on the mainnet.

🚀 **Happy building on Solana!**
