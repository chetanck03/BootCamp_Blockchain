// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Overloading  {
    function add(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }

    function add(uint256 a, uint256 b, uint256 c) public pure returns (uint256) {
        return a + b + c;
    }
}


/*
 Polymorphism:
 -> Multiple functions with the same name, but they do different things based on the input they receive or the context in which they are used.
 -> Polymorphism in Solidity is primarily achieved through:
    1) Function Overloading: Defining multiple functions with the same name but different parameters.
    2) Inheritance: Allowing derived contracts to override functions defined in base contracts.
    3) Interfaces and Abstract Contracts: Providing a way to define function signatures that must be implemented by derived contracts.

*/


/*  Function Overloading : 
   -> Multiple functions can have the same name but must differ in the number or type of their parameters.
   -> Usage: Allows functions to handle different types of inputs and perform similar actions.
*/