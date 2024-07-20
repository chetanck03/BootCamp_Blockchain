# Solidity Libraries

In Solidity, a library is a special type of contract designed to hold reusable code. Here’s a quick overview:

## Key Points

- **Reusable Code**: Libraries contain code that can be used by other contracts to avoid duplication.
- **Stateless**: They don’t hold data or Ether; they only provide functions.
- **Function Calls**: Functions in libraries are used via the `using for` syntax, making them available as methods on variables.
- **Gas Efficient**: They save gas by reducing the need to deploy code multiple times.
- **Integration**: Library functions are copied into the bytecode of the contracts that use them.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library MathLib {
    // Function to add two unsigned integers
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }

    // Function to subtract two unsigned integers
    function subtract(uint256 a, uint256 b) internal pure returns (uint256) {
        require(a >= b, "Subtraction overflow");
        return a - b;
    }

    // Function to multiply two unsigned integers
    function multiply(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    // Function to divide two unsigned integers
    function divide(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "Division by zero");
        return a / b;
    }
}

contract Calculator {
    using MathLib for uint256;

    function addNumbers(uint256 a, uint256 b) public pure returns (uint256) {
        return a.add(b);
    }

    function subtractNumbers(uint256 a, uint256 b) public pure returns (uint256) {
        return a.subtract(b);
    }

    function multiplyNumbers(uint256 a, uint256 b) public pure returns (uint256) {
        return a.multiply(b);
    }

    function divideNumbers(uint256 a, uint256 b) public pure returns (uint256) {
        return a.divide(b);
    }
}
