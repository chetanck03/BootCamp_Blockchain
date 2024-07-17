// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Wallet{
    address public owner;
    string public str;
    
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
    }

// Transfer ETH (wei uint) To User Account by the contract
   function transferEther(address to,uint weiAmount) external onlyOwner {
    require(address(this).balance >= weiAmount,"Not Enough Balance");
    payable(to).transfer(weiAmount);
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

   }

// Check the owner balance
   function getOwnerBalance() external view returns(uint){
      return owner.balance;
   }

   fallback() external{
      str="Fallback Function is called";
   }

}

/*
   
   1) payable :
      ->The payable keyword in Solidity is used to denote functions and addresses that can receive Ether.
      ->A function must be marked as payable to be able to receive Ether. This ensures that Ether transfers are only possible to functions explicitly intended to handle them.
      -> Example :
          function deposit() public payable {
           // function logic
          }

   2) Special Variables:
    -> msg.value :
        This global variable stores the amount of Ether (in wei) sent with a function call.
    -> address(this).balance:
        This gives the current balance of the contract.

   3) Constructor and Fallback:
    -> Constructors can be marked payable to accept initial funding upon deployment
    -> Fallback functions, which are executed when a contract receives Ether without any other data, must be payable to receive Ether.
    -> Example :
        fallback() external payable {
          // fallback logic
        }

   4) Sending Ether:
      -> Ether can be sent from a contract using address.send(), address.transfer(), or address.call(). However, send and transfer are generally safer because they automatically limit the gas forwarded with the call. 
      -> Example :
            payable(address).transfer(amount);
     

*/