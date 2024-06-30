# Solidity Contract Overview

## Contract Details
- **Contract Account**: 0xcD6a42782d230D7c13A74ddec5dD140e55499Df9

## State Variables
1. **num**: A state variable of type `int`, initialized with the value `10`.
   - Permanently stored in contract storage.
   - Reading state variables is free (no gas cost), but writing to them is expensive.
   - Example usage: `returnStateVariable()` function.

## Local Variables
- Local variables are declared inside functions and are kept on the stack (not in storage).
- They don't incur any gas cost.
- Example usage: `localVar()` function.

## View & Pure Functions
1. **View Functions**:
   - Allow reading from state variables without modifying them.
   - Example usage: `returnStateVariable()` function.

2. **Pure Functions**:
   - No reading or modification of state variables.
   - No function calls or storage access.
   - Example usage: `localVar()` function.

// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract demo {
    int public num = 10; // State variable

    function changeStateVariable() public {
        num = 20; // Writing the state variable
    }

    function returnStateVariable() public view returns (int) {
        return num; // View the state variable
    }

    function readwriteStateVariable() public returns (int) {
        num = 100; // Writing the state variable
        return num; // View the state variable
    }

    function localVar() public pure returns (bool) {
        bool val = true; // Local variable
        return val;
    }
}
