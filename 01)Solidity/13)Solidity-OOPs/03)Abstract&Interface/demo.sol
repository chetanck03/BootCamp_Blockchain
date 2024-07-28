// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
/*
   Interfaces Contracts :
  -> Can only have function declarations (no implementations).
  -> All functions are external by default.
  -> Cannot define state variables & not have constructors.
  -> Interfaces cannot hold any data.
  -> Can only inherit from other interfaces, not from contracts.

*/
interface IExample {
    function greet() external view returns (string memory);
}

contract Interface is IExample {
    function greet() external pure override returns (string memory) {
        return "Hello from Interface";
    }
}
/*
   Abstract Contracts :
  -> Can have both implemented (complete) and unimplemented (abstract) functions.
  -> Cannot be deployed directly.
  -> Can define state variables & have constructors.
*/
abstract contract AbstractExample {
    string public name;
    constructor() {
        name = "Hello World";
    }
    
    // Complete function
    function InFunction() public pure returns (string memory) {
        return "InFunction";
    }
   
    // Unimplemented function (abstract)
    function greet() public virtual returns (string memory);
}

contract abstracts is AbstractExample {
    function greet() public pure override returns (string memory) {
        return "Hello from abstracts";
    }
}
