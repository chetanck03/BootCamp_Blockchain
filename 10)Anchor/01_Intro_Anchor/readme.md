# Counter Program (Solana + Anchor)

## Overview
This program implements a simple counter using Solana's Anchor framework. It allows users to initialize a counter, increment it, and decrement it. The counter is stored on-chain in a Solana account.

## Smart Contract Functions
1. **Initialize Counter** - Creates a new counter account and sets the initial count to `0`.
2. **Increment Counter** - Increases the counter value by `1`.
3. **Decrement Counter** - Decreases the counter value by `1`.

## Setup the Anchor

Follow these steps to set up and deploy the Anchor program:

### 1. Initialize the project
```sh
anchor init counter
```

### 2. Build the project
```sh
anchor build
```

### 3. Deploy the program
```sh
anchor deploy
```
#### Example Deployment Output:
```
Deploying cluster: https://api.devnet.solana.com
Upgrade authority: /home/chetan/.config/solana/id.json
Deploying program "counter"...
Program path: /mnt/c/Users/ComHuT/Desktop/counter/target/deploy/counter.so...
Program Id: 928UVz3wfpMH6Y2aHxou4HBYP3v65mApWmaXKSm7BaBE

Signature: 58LmxLzLitfuZouu8SBJXSiu9NEgSVkUzA8fvjiaxmY9yLT24NBGCipy3cYTbP2TW4tx4HhVa7Sv6r6RBh9G1LZg

Deploy success
```

### 4. Run tests
```sh
anchor test
```
#### Example Test Output:
```
Your transaction signature 4FGryqBKHhLgtT4s8outcpbx5LSp9EaK1p9GdUpBcPuRCntuKaDmJ2M13dvNVLxt1n6CuxywWp3ji7yUgcEvU8Pa
```

### 5. Testing on Solana Playground
You can also test the deployed program using **[Solana Playground](https://beta.solpg.io/)** by pasting the program ID and interacting with the contract functions.

## Notes
- Ensure that you have Solana CLI and Anchor installed before running the commands.
- Use `solana config get` to check your current Solana cluster settings.
- If you encounter permission errors, try running the commands with `solana-test-validator` for local testing.

Happy coding! 🚀
