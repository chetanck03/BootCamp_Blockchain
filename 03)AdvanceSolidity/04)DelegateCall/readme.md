# Solidity Delegatecall Example

This repository contains an example demonstrating the use of `delegatecall` in Solidity. `delegatecall` allows a contract to call functions from another contract while maintaining its own context.

## Key Points of `delegatecall`

- **Context Preservation**: `delegatecall` executes code from another contract but preserves the original context. The storage, address, and balance of the calling contract remain unchanged.
- **External Contract Invocation**: It allows a contract to use functions from another contract without directly invoking the external contract.
- **Security**: Using `delegatecall` can be risky if not properly handled. Always ensure that the external contract's code is trusted to avoid unintended consequences.
- **Use Case**: Commonly used in upgradable contract patterns, allowing logic updates by deploying a new contract while keeping the same storage structure.

## Example

The example consists of two contracts: `StorageContract` and `CallerContract`.

### StorageContract.sol

This contract has a storage variable that will be modified by `CallerContract` using `delegatecall`.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StorageContract {
    uint public storedData;

    function set(uint _data) public {
        storedData = _data;
    }
}
```

### CallerContract.sol
This contract uses `delegatecall` to execute the `set` function from `StorageContract`. The `delegatecall` changes `CallerContract`'s storage.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CallerContract {
    uint public storedData;

    function setStoredData(address _storageContract, uint _data) public {
        (bool success, ) = _storageContract.delegatecall(
            abi.encodeWithSignature("set(uint256)", _data)
        );
        require(success, "Delegatecall failed");
    }
}
```

## Explanation

### StorageContract
Contains a function `set` that updates the `storedData` variable.

### CallerContract
Uses `delegatecall` to execute the `set` function from `StorageContract`. The storage update affects `CallerContract`'s `storedData` variable, not `StorageContract`'s.

This example demonstrates how `delegatecall` can be used to execute code from another contract while keeping the calling contract's storage intact.

## Usage

1. Deploy the `StorageContract` contract.
2. Deploy the `CallerContract` contract.
3. Call `setStoredData` on the `CallerContract`, passing the address of the `StorageContract` and the data to be set.
