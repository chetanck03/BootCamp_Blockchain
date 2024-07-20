// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Wallet{
    address public owner;
    string public str;

   // Events
   event Transfer(address receiver,uint amount);
   event Receive(address sender,uint amount);

    
    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender==owner,"Only owner can call this function");
        _;
    }

 // Transfer to Contract 
    function contractAddEth() external payable{
        str="Amount transferred to the contract";
        emit Receive(msg.sender, msg.value);

    }

// Transfer ETH (wei uint) To User Account by the contract
   function transferEther(address to,uint weiAmount) external onlyOwner {
    require(address(this).balance >= weiAmount,"Not Enough Balance");
    payable(to).transfer(weiAmount);
    emit Transfer(to, weiAmount);
   }

// withdraw Eth from the contract
   function withdraw(uint weiAmount) external payable{
    require(address(this).balance>=weiAmount,"Not Enough Balance");
    payable(msg.sender).transfer(weiAmount);
   }

// Check the Contract Balance
   function contractBalance() public view returns(uint){
    return address(this).balance;
   }  

// Transfer the ETH by the user account by the msg.value
   function transferEthUserAccount(address to) external payable{
    require(address(this).balance >= msg.value,"Not Enough Balance");
    payable(to).transfer(msg.value);
   }

// Owner Receive Eth from the user
   function receiveFromUser() external payable {
    require(msg.value > 0,"Amount should be greater than zero");
    payable(owner).transfer(msg.value);
    emit Receive(msg.sender, msg.value);

   }

// Check the owner balance
   function getOwnerBalance() external view returns(uint){
      return owner.balance;
   }

   receive() external payable { 
      emit Receive(msg.sender, msg.value);

   }

   fallback() external{
      str="Fallback Function is called";
   }

}