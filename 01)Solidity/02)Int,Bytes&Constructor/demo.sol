// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract demo{
// int & uint :
    int8 public itemInt=120;
    uint8 public itemUint=255;

// constructor
    int public chetan ;
    constructor(int count){
        chetan = count;
    }

// bytes
    bytes1 public letter1="a";
    bytes2 public letter2="ab";

    function returnByte() public view returns(bytes2){
        // return letter2[1];
        return letter2;
    }
}

/*

  1) int & uint :

    • int: integer(+ve & -ve )
    • uint: unsigned integer (+ve only )

      -> like range ...
        int8 : -128 to 127 | uint8 : 0 to 255

    ___________________________________________

  2) Constructor :

    • Executed only once , at the deploy time of the contract.
    • You can create only one constructor and that is optional.
    • A default constructor is created by the compiler if there is no explicitly defined constructor.

    ___________________________________________


   3) Bytes Data Type :

    • Bytes data type is used to store strings. Range - bytes1, bytes2, .....,bytes32.
    • It stores characters. 
    • Everything that will be stored in the bytes array will be in hexadecimal number.

*/