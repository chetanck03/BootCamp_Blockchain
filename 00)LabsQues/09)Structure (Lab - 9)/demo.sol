// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract demo {

// Structure of Array
   struct USER{
    uint id;
    string name;
   }

  USER[] arr;
  uint counter =1;

// Insert Function
   function insert(string memory _name) public {
    arr.push(USER(counter,_name));
    counter++;
   }

// Read Function
   function read(uint id) public view returns(uint,string memory) {
    require(id>0 && id<counter,"Please enter the valid id");
    
    USER memory user = arr[id-1];
    return (user.id, user.name);
   }

// Find Function
   function find(uint id) public view returns(string memory) {
    require(id>0 && id<counter,"User does not exist!");
    USER memory user = arr[id-1];
    return user.name;
   }
    
}

