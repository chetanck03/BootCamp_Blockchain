// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract demo {

/*
   Fibonacci Sequence : sum of the first two digit is equal to the third digit

    0, 1, 1, 2, 3, 5, 8, 13,...
*/
   function fib(uint n) public pure returns(uint ){
      if (n<=1 ) return n;
      return fib(n - 1) + fib(n - 2);
    }

 }

