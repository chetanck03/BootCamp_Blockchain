// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StorageContract {
    uint public storedData;

    function set(uint _data) public {
        storedData = _data;
    }
}

contract CallerContract {
    uint public storedData;

    function setStoredData(address _storageContract, uint _data) public {
        (bool success, ) = _storageContract.delegatecall(
            abi.encodeWithSignature("set(uint256)", _data)
        );
        require(success, "Delegatecall failed");
    }
}