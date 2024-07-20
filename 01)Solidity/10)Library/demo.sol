// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Multiply.sol";

// 1st Library Method
library Addition{
   function add(uint a,uint b) public pure returns(uint){
      return a+b;
   }
}

// Contract
contract demo{
   function sum(uint x, uint y) public pure returns(uint){
      return Addition.add(x,y);
   }

   function multiply(uint x ,uint y) public pure returns (uint){
      return Multiply.multi(x,y);
    }
}