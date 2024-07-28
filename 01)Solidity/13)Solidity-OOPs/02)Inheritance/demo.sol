// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Base {
    uint public a = 1234567 ;
    function greet() public pure  virtual returns (string memory) {
        return "Hello from Base";
    }
}

contract Derived is Base {
    function greet() public pure override returns (string memory) {
        return "Hello from Derived";
    }
}

/*  Inheritance and Function Overriding :
    -> Derived contracts can inherit and override functions from base contracts.
    -> Enables code reuse and customization of behavior in derived contracts.
    -> Modifiers:
        • virtual: Indicates that a function in a base contract can be overridden.
        • override: Indicates that a function in a derived contract overrides a base contract function.
*/