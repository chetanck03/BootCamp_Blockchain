// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract demo {
    function concatenate ( string memory string1 , string memory string2 ) public pure returns(string memory){
           string memory a = string.concat(string1,string2) ;
           return a;
    }
}

