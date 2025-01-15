## Set Up Project

### Initialize Project
- Run the following command to initialize the project:
  ```bash
  forge init --no-commit
  ```

### Install Dependencies
- Install OpenZeppelin contracts:
  ```bash
  npm install @openzeppelin/contracts@4.9.6
  ```

### Create Required Files
- Create the following files and folders:
  - `remappings.txt`
  - `src/NftMinting.sol`
  - `test/NftMinting.t.sol`

### Compile the Project
- Compile the project with the command:
  ```bash
  forge compile
  ```

### Generate Merkle Root
1. Create a `generateMerkleRoot.js` file in the `script` folder.
2. Install required npm packages:
   ```bash
   npm install merkletreejs keccak256
   ```
3. Generate the Merkle root:
   ```bash
   node script/generateMerkleRoot
   ```
   Example output:
   ```
   0xeeefd63003e0e702cb41cd0043015a6e26ddb38073cc6ffeb0ba3e808ba8c097
   ```

### Test with Merkle Root
- Run the following command to test with the Merkle root:
  ```bash
  forge test --ffi -vvv
  ```
  - `--ffi`: Enables foreign function interface.
  - `-vvv`: Sets the verbosity level to the highest for detailed output.
  
  Example output:
  ```
  0xeeefd63003e0e702cb41cd0043015a6e26ddb38073cc6ffeb0ba3e808ba8c097
  ```
