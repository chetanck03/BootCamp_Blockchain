// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    uint[3] public arr = [10, 20, 30];

    function storageArr() external {
        uint[3] storage stoArr = arr;
        stoArr[0] = 10;
    }

    function memoryArr() external view returns (uint[3] memory) {
        uint[3] memory memArr = arr;
        memArr[0] = 100;
        return memArr;
    }
}

/*
   1) Persistence:
    ->   Storage: Persistent and saved on the blockchain.
    ->  Memory: Temporary and discarded after function execution.

   2) Gas Costs:
    -> Storage: Higher gas costs due to permanent storage on the blockchain.
    -> Memory: Lower gas costs due to temporary nature.

   3) Use Cases:
   -> Storage: Suitable for state variables that need to be stored and persist  .
   -> Memory: Suitable for temporary data within functions that do not need to persist.

*/