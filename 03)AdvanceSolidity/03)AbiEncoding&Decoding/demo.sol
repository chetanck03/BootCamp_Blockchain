// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ABIExample {
    // A simple function that accepts an uint and returns its square
    function getSquare(uint256 num) external pure returns (uint256) {
        return num * num;
    }
}

contract ABIEncoding {
    // Function to encode and call the getSquare function
    function encodeFunctionCall(address contractAddress, uint256 number) external view returns (bytes memory) {
        // Encoding the function call
        bytes memory data = abi.encodeWithSignature("getSquare(uint256)", number);
        
        // Make the external call
        (bool success, bytes memory result) = contractAddress.staticcall(data);
        require(success, "Call failed");
        
        // Decoding the result
        uint256 square = abi.decode(result, (uint256));
        return result;
    }
}
