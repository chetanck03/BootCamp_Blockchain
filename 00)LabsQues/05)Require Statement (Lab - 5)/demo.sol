// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract demo {
 
 function  checkInput(int input) public pure returns(string memory){
    require(input>=0 && input<=255,"Not Within Range");
    return "Within Range";
 }
    
}

