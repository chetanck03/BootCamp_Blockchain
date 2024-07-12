// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract demo {

  uint public stateVariable = 10;

    function returnStateVariable() public view returns (uint) {
        return stateVariable;
    }

    function returnLocalVariable() public pure returns (uint) {
        uint localVariable = 20;
        return localVariable;
    }

    
}

