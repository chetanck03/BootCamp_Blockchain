// contracts/BoxV2.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BoxV2 {
    uint256 public value;

    // Increments the stored value by 1
    function incrementVal() public {
        value+= 1;
    }
}

