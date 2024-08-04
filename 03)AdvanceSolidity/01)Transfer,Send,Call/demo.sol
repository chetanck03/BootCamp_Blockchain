// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransferExample {
    // Function to transfer Ether using transfer method
    function transferEther(address payable recipient) external payable {
        recipient.transfer(msg.value);
    }

    // Function to transfer Ether using send method
    function sendEther(address payable recipient) external payable returns (bool) {
        bool success = recipient.send(msg.value);
        require(success, "Send failed");
        return success;
    }

    // Function to transfer Ether using call method
    function callEther(address payable recipient) external payable returns (bool) {
        (bool success, ) = recipient.call{value: msg.value}("");
        require(success, "Call failed");
        return success;
    }

    // Fallback function to accept Ether
    receive() external payable {}
}
