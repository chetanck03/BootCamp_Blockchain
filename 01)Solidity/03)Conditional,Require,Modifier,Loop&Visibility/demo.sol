// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract demo {

  int public num;

// 1) Conditionals : 
  function Conditions(int a) public pure returns(int) {
    if (a > 0) {
        return 0;
    } else if (a < 0) {
        return -1;
    } else {
        return 1;
    }
  }
  
// 2)  Require :
  function Require(int b) public  {
    require(b>2,"b is smaller than 2");
    num = b ** 2;
  }

// 3)  Modifier :
  modifier Range(int value , int max , int min ){
    require(value>=min && value<=max,"value is out of range");
    _;
  }

  function checkValue(int value) public Range(value,100,10){
    num = value;
  }

// 4) Visibility :
   uint256 public c;
   uint256 public d;
   
   function f1() public returns(uint){
    c = f3();
    d=f2();
    return 1;
    }

   function f2() private pure returns(uint){return 2;}
   function f3() internal pure returns(uint){return 3;}
   function f4() external pure returns(uint){return 4;}

}


contract other is demo { // Inhertiance
  uint public x=f3();
}
/*
  1) Conditionals : 

  -> Conditional statements are used to perform different actions based on different conditions.
  
  -> If else statements are used to test the condition and take different actions based on the result of the condition.
  
  -> If statement is used to test the condition and take an action based on the result of the condition.
  
  -> Switch statement is used to test the condition and take an action based on the result of the condition.
  
  -> For loop is used to iterate over a block of code until the condition is met.
  
  -> While loop is used to iterate over a block of code until the condition is met.
  
  -> Do while loop is used to iterate over a block of code until the condition is met.
  
  -> Break statement is used to exit the loop when the condition is met.
  
  -> Continue statement is used to skip the current iteration when the condition is met.

  2) Require :

  -> It checks if an expression is true. If it's false, the transaction is reverted (stopped) and an optional error message is returned.

  -> Helps in handling errors by providing clear reasons why the transaction failed, making debugging easier.

  -> When a transaction is reverted using require, the remaining gas is refunded to the sender, but the gas used until that point is consumed.

  -> Basic usage: require(condition, "Error message");


  3) Modifier :

  -> Enhances code readability and maintainability.

  -> Defined with the modifier keyword, followed by the modifier name and logic

  -> Helps write reusable conditions that can be applied to multiple functions.

  -> Represents the function code, which runs where _ is placed in the modifier.

  4) Visibility :

  -> Controls who can access functions and state variables.

  -> Types:
  
      public: Accessible by anyone.
      external: Callable from other contracts or external accounts.
      internal: Accessible within the contract and its derived contracts.
      private: Accessible only within the contract it is defined in.

  -> Use Cases:

      public: External interactions.
      external: Mainly for contract-to-contract calls.
      internal: For inherited contracts.
      private: For internal use only.    

  5) Inheritance:

  -> Allows one contract to inherit properties and functions from another, promoting code reuse.

  -> Use the is keyword to inherit from another contract.

  -> Derived contracts can access public and internal functions and variables of the base contract.

*/
