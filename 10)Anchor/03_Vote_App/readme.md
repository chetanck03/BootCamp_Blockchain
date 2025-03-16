# Solana Voting Application

A simple and secure decentralized voting application built on the Solana blockchain using the Anchor framework.

## Overview

This application allows for a transparent and secure voting process where:
- Candidates can register with their name and party affiliation
- Voters can register to participate in the election
- Registered voters can cast one vote for their preferred candidate

## Setup Instructions

### Prerequisites
1. Install Rust:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

2. Install Solana CLI:
```bash
sh -c "$(curl -sSfL https://release.solana.com/v1.17.0/install)"
```

3. Install Anchor CLI:
```bash
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest
```

### Project Setup
1. Create new Anchor project:
```bash
anchor init vote_app
cd vote_app
```

2. Build the project:
```bash
anchor build
```

3. Update Program ID:
   - After building, copy the new program ID from `target/idl/vote_app.json`
   - Replace the program ID in `lib.rs` and `Anchor.toml`

4. Build again with updated program ID:
```bash
anchor build
```

### Running Tests
```bash
anchor test
```

### Deployment
1. Start local test validator:
```bash
solana-test-validator
```

2. Deploy to localnet:
```bash
anchor deploy
```

## Features

### 1. Candidate Registration
- Each candidate can register with:
  - Candidate name
  - Party name
  - Automatically tracked vote count
- Each candidate gets a unique identifier (public key)

### 2. Voter Registration
- Voters can register with their name
- Each voter gets a unique identifier (public key)
- System tracks voting status to prevent double voting

### 3. Voting Process
- One vote per registered voter
- Secure verification of voter identity
- Automatic vote counting
- Protection against double voting

## Security Features

- Double voting prevention
- Voter identity verification
- Transparent vote counting
- Blockchain-based immutable record keeping

## Technical Details

### Account Structures

**Candidate Account:**
```rust
pub struct Candidate {
    c_id: Pubkey,        // Candidate's unique identifier
    party_name: String,  // Limited to 20 characters
    c_name: String,      // Limited to 20 characters
    votes: u8           // Vote count (max 255)
}
```

**Voter Account:**
```rust
pub struct Voter {
    v_id: Pubkey,       // Voter's unique identifier
    v_name: String,     // Limited to 20 characters
    is_voted: bool      // Voting status
}
```

### Program Instructions

1. `register_candidate`: Register a new candidate
2. `register_voter`: Register a new voter
3. `cast_vote`: Cast a vote for a candidate

### Error Handling

The program includes error handling for:
- Attempted double voting
- Unauthorized voting attempts

## Requirements

- Solana CLI
- Anchor Framework
- Rust

## Note

This is a basic implementation of a voting system on Solana. For production use, additional security measures and features should be implemented.