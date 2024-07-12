// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract demo {

 function reverseArray(uint[] memory arr , uint length) public pure returns(uint[] memory){

     uint[] memory rev = new uint[](length);// Initialize an empty array of length
     for(uint i=0;i<length;i++){
        rev[i] = arr[length-1-i];
     }
     return rev;
    }
}
