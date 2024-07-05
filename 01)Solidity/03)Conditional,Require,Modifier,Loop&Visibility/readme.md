# Solidity Contract Overview

This Solidity contract demonstrates various key concepts in Solidity programming including conditionals, require statements, modifiers, visibility, and inheritance.

## Key Concepts

### 1. Conditionals

- Conditional statements are used to perform different actions based on different conditions.
- The `if`, `else if`, and `else` statements are used to test conditions and execute corresponding actions.

### 2. Require

- The `require` statement checks if a condition is true.
- If the condition is false, the transaction is reverted with an optional error message.
- It helps in error handling and provides clear reasons for transaction failures.

### 3. Modifier

- Modifiers are used to change the behavior of functions.
- They allow adding reusable conditions that can be applied to multiple functions.
- The `_` placeholder represents the function code that runs where it is placed in the modifier.

### 4. Visibility

- Visibility controls who can access functions and state variables.
- Types of visibility:
  - `public`: Accessible by anyone.
  - `external`: Callable from other contracts or external accounts.
  - `internal`: Accessible within the contract and its derived contracts.
  - `private`: Accessible only within the contract it is defined in.

### 5. Inheritance

- Inheritance allows one contract to inherit properties and functions from another.
- It promotes code reuse and organization.
- Derived contracts can access public and internal functions and variables of the base contract.

## Example Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract demo {
    int public num;

    // 1) Conditionals
    function Conditions(int a) public pure returns(int) {
        if (a > 0) {
            return 0;
        } else if (a < 0) {
            return -1;
        } else {
            return 1;
        }
    }

    // 2) Require
    function Require(int b) public {
        require(b > 2, "b is smaller than 2");
        num = b ** 2;
    }

    // 3) Modifier
    modifier Range(int value, int max, int min) {
        require(value >= min && value <= max, "value is out of range");
        _;
    }

    function checkValue(int value) public Range(value, 100, 10) {
        num = value;
    }

    // 4) Visibility
    uint256 public c;
    uint256 public d;

    function f1() public returns(uint) {
        c = f3();
        d = f2();
        return 1;
    }

    function f2() private pure returns(uint) { return 2; }
    function f3() internal pure returns(uint) { return 3; }
    function f4() external pure returns(uint) { return 4; }
}

contract other is demo { // Inheritance
    uint public x = f3();
}
