// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CKToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("CKToken", "CK") {
        _mint(msg.sender, initialSupply);
    }

}

//  ETH : 10000 & Wei : 10000000000000000000000