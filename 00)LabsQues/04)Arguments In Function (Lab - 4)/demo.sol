// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract demo {

    uint256  stateVariable;

    function set(uint256 x) public  {
      stateVariable=x;
    }

    function get() public view returns(uint256){
      return stateVariable;
    }
}