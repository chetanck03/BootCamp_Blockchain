// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Wallet {
    // Transaction history
    struct Transaction {
        address senderAddress;
        address receiverAddress;
        uint timestamp;
        uint amount;
    }

    Transaction[] public transactionHistory;
   
    address public owner;
    bool public paused;

    // Events
    event Transfer(address indexed receiver, uint amount);
    event Receive(address indexed sender, uint amount);
    event ReceiveUser(address indexed sender, address indexed receiver, uint amount);
    event Paused();
    event Unpaused();
    event OwnerChanged(address indexed oldOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Transfer to Contract
    function contractAddEth() external payable whenNotPaused {
        transactionHistory.push(Transaction({
            senderAddress: msg.sender,
            receiverAddress: address(this),
            timestamp: block.timestamp,
            amount: msg.value
        }));
    }

    // Transfer ETH (wei uint) To User Account by the contract
    function transferEther(address to, uint weiAmount) external onlyOwner whenNotPaused {
        require(address(this).balance >= weiAmount, "Not Enough Balance");
        require(to != address(0), "Invalid address");
        payable(to).transfer(weiAmount);

        transactionHistory.push(Transaction({
            senderAddress: msg.sender,
            receiverAddress: to,
            timestamp: block.timestamp,
            amount: weiAmount
        }));

        emit Transfer(to, weiAmount);
    }

    // Withdraw Eth from the contract
    function withdraw(uint weiAmount) external payable whenNotPaused {
        require(address(this).balance >= weiAmount, "Not Enough Balance");
        payable(msg.sender).transfer(weiAmount);

        transactionHistory.push(Transaction({
            senderAddress: address(this),
            receiverAddress: msg.sender,
            timestamp: block.timestamp,
            amount: weiAmount
        }));
    }

    // Check the Contract Balance
    function contractBalance() public view returns (uint) {
        return address(this).balance;
    }

    // Transfer the ETH by the user account by the msg.value
    function transferEthUserAccountMsgValue(address to) external payable whenNotPaused {
        require(address(this).balance >= msg.value, "Not Enough Balance");
        require(to != address(0), "Invalid address");
        payable(to).transfer(msg.value);

        transactionHistory.push(Transaction({
            senderAddress: msg.sender,
            receiverAddress: to,
            timestamp: block.timestamp,
            amount: msg.value
        }));
    }

    // Owner Receive Eth from the user
    function receiveFromUser() external payable whenNotPaused {
        require(msg.value > 0, "Amount should be greater than zero");
        payable(owner).transfer(msg.value);

        transactionHistory.push(Transaction({
            senderAddress: msg.sender,
            receiverAddress: owner,
            timestamp: block.timestamp,
            amount: msg.value
        }));

        emit ReceiveUser(msg.sender, owner, msg.value);
    }

    // Check the owner balance
    function getOwnerBalance() external view returns (uint) {
        return owner.balance;
    }

    // Change the owner
    function changeOwner(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        emit OwnerChanged(owner, newOwner);
        owner = newOwner;
    }

    // Pause the contract
    function pause() external onlyOwner {
        paused = true;
        emit Paused();
    }

    // Unpause the contract
    function unpause() external onlyOwner {
        paused = false;
        emit Unpaused();
    }

    // Retrieve transaction history
    function getTransactionHistory() external view returns (Transaction[] memory) {
        return transactionHistory;
    }

    receive() external payable whenNotPaused {
        transactionHistory.push(Transaction({
            senderAddress: msg.sender,
            receiverAddress: owner,
            timestamp: block.timestamp,
            amount: msg.value
        }));
        emit Receive(msg.sender, msg.value);
    }

    fallback() external {
        revert("Invalid function call");
    }
}
