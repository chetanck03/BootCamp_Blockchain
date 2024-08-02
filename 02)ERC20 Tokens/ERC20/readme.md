# ERC-20 Token Contract Explanation

### Key Points

1. **License and Version**
   - `// SPDX-License-Identifier: MIT`
   - `pragma solidity ^0.8.0`
   - Specifies the license type (MIT) and the Solidity compiler version (0.8.0).

2. **Interface Definition**
   - `interface CHETAN`
   - Defines the standard functions and events required for an ERC-20 token.

3. **Events**
   - `event Transfer(address indexed from, address indexed to, uint256 value);`
   - `event Approval(address indexed owner, address indexed spender, uint256 value);`
   - Events are used to log significant actions like transfers and approvals.

4. **Standard Functions**
   - `function totalSupply() external view returns (uint256);`
   - `function balanceOf(address account) external view returns (uint256);`
   - `function transfer(address to, uint256 value) external returns (bool);`
   - `function allowance(address owner, address spender) external view returns (uint256);`
   - `function approve(address spender, uint256 value) external returns (bool);`
   - `function transferFrom(address from, address to, uint256 value) external returns (bool);`
   - These functions define the basic functionalities of an ERC-20 token, such as transferring tokens and approving allowances.

5. **Contract Implementation**
   - `contract ERC20 is CHETAN`
   - Implements the `CHETAN` interface and its functions.

6. **State Variables**
   - `uint256 public override totalSupply = 1000;`
   - `uint8 public decimals = 0;`
   - `string public name = "TestToken";`
   - `string public symbol = "CK";`
   - Defines the token's total supply, name, symbol, and decimal places.

7. **Mappings**
   - `mapping(address => uint256) public balanceOf;`
   - `mapping(address => mapping(address => uint256)) public allowances;`
   - Tracks the token balance of each address and the allowances set by owners for spenders.

8. **Constructor**
   - `constructor() { balanceOf[msg.sender] = totalSupply; }`
   - Assigns the entire token supply to the contract deployer (creator).

9. **Transfer Function**
   - `function transfer(address to, uint256 value) external override returns (bool)`
   - Transfers tokens from the sender's address to another address.

10. **Allowance Function**
    - `function allowance(address owner, address spender) external view override returns (uint256)`
    - Checks the remaining tokens a spender is allowed to transfer on behalf of the owner.

11. **Approve Function**
    - `function approve(address spender, uint256 value) external override returns (bool)`
    - Allows the owner to approve a spender to transfer tokens on their behalf.

12. **TransferFrom Function**
    - `function transferFrom(address from, address to, uint256 value) external override returns (bool)`
    - Allows a spender to transfer tokens from the owner's account to another account, based on the approved allowance.

### Summary
This contract provides a basic implementation of an ERC-20 token, allowing for the transfer of tokens, checking balances, and approving allowances for third-party transfers.
