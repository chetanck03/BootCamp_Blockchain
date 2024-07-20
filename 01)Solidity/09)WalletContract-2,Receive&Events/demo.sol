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

   //  emit
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

/*
   
   1) Receive() : 
      -> The receive function lets a smart contract accept Ether sent to it without any extra data.
      -> It gets called when someone sends Ether to the contract without any additional instructions or data.
      -> Example:
           receive() external payable { }

  2) Events :          
      -> Log Information: Events are used to record information on the blockchain.
      -> Efficient Storage: Storing events is cheaper than storing state variables.
      -> Notify External Apps: They help external apps (like web interfaces) listen for specific actions in the contract.
      -> Example:
           1) Declare an Event:
               event Transfer(address indexed from, address indexed to, uint256 value);
           2) Emit an Event:
               emit Transfer(msg.sender, receiver, amount);
*/



