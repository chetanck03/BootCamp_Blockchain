# Solidity Polymorphism Example

## Overview

This Solidity project demonstrates the concept of polymorphism, which allows functions with the same name to perform different tasks based on their input parameters or context. The project showcases various types of polymorphism in Solidity, including function overloading, inheritance and function overriding, interfaces, and abstract contracts.



 **Function Overloading:**
   - Demonstrated in the `Overloading` contract.
   - Multiple `add` functions with the same name but different parameters.
   - Allows the same function name to handle different numbers or types of inputs.

   ```solidity
   contract Overloading {
       function add(uint256 a, uint256 b) public pure returns (uint256) {
           return a + b;
       }

       function add(uint256 a, uint256 b, uint256 c) public pure returns (uint256) {
           return a + b + c;
       }
   }
