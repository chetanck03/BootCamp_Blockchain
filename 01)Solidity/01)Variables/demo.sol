// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;


contract demo{
    // This is the place to write the code
    int public num=10;//state variable
   
    function changeStateVariable() public{
        num=20;//writing the state variable
    }

    function returnStateVariable() public view returns(int){
        return num;//view the state variable`                                                   
    }

    function readwriteStateVariable() public returns(int){
        num=100;//writing the state variable
        return num;//view the state variable`                                                   
    }

     function localVar() public pure returns(bool){
        bool val = true;//local variable 
        return val;

    }

}

// Contract Account : 0xcD6a42782d230D7c13A74ddec5dD140e55499Df9

/* 1) State Variables :
        • Permanently stored in contract storage.
        • Cost gas(expensive) .
        • Reading of state variable is free but writing to it is costly.
*/

/* 2) Local Variables :
        • Declared inside functions and are kept on the stack , not on storage.
        • Don’t cost gas.
*/

/* 3) View & Pure :
        • View : Reading from the state variable
        • Pure : No writing, no cost, no function call, no storage access from the state variable
*/
