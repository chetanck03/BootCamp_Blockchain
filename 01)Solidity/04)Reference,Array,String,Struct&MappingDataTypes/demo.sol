// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Fixed Array
contract fixedArray{
  uint[5] public array;

  function getLength() public view returns(uint){
    return array.length;
  }

  function updateElement(uint index,uint value) public{
    require(index<array.length,"Array Size is Limited");
    array[index]=value;
  }
}


// Dynamic Array
contract dynamicArray{
  uint[] public array;

  function addElement(uint value) public{
    array.push(value);
  }
  function geElement() public view returns(uint){
    return array.length;
  }
  function removeElement() public{
    require(array.length>0,"Array is Empty");
    array.pop();
  }

}

// String Data Type

contract stringType{

  string public myString;

  function addString(string memory newString) public{
    myString = newString;
  }

  function getString() public  view returns(string memory){
    return myString;
  }
}

// Struct Data Type
contract structType{

  struct Student{
    string name;
    uint roll;
    bool pass;
  }

  Student public s1;

  function insert() public returns(Student memory){
    // Method 1:
    s1.name="A";
    s1.roll=1;
    s1.pass=true;

    // Method 2:
    s1=Student("B",2,true);

    return s1;
  }
}


// Mapping Data Type 

contract mapType{
 
// • Simple Mapping
  mapping (uint=>string) student;

  function insertData(uint roll,string memory name) public {
    student[roll]=name;
  }
  
  function getData(uint roll) public view returns (string memory) {
    return student[roll];
  }

// • Nested Mapping
  mapping(uint=>mapping(uint=>string)) user;

  function insertUser(uint id, uint experience , string memory position) public{
    user[id][experience]=position;
  }
  function getUser(uint id, uint experience) public view returns (string memory) {
   return user[id][experience];
  }

}

/*
1) Reference Data Type :
  -> Reference Data Types: Store the location of data, not the data itself.
  -> Common Types: Arrays, Structs, Mappings.
  -> Memory vs. Storage:
      • Storage: Permanent on blockchain.
      • Memory: Temporary during function execution.

2) Arrays :
  -> Arrays are collections of elements of the same type.
  -> Types:
      • Fixed-size Arrays: Have a predefined size.       
      • Dynamic Arrays: Can change size during execution.
  -> Usage Examples:
      • Fixed-size Array: uint[10] public fixedArray;     
      • Dynamic Array: uint[] public dynamicArray;

  -> Common Operations:
      • Push: Add elements to dynamic arrays (dynamicArray.push(1);).
      • Pop: Remove the last element from dynamic arrays (dynamicArray.pop();).
      • Length: Get the number of elements (dynamicArray.length;).

3) String Data Type :
   -> Strings are sequences of characters used to store text.
   -> Strings are reference types, stored as byte arrays.
   -> Usage Examples:
      • Declaration: string public myString;
      • Assignment: myString = "Hello, World!";


4) Struct Data Type :
   -> Structs are custom data types that group multiple variables under a single name.
   -> Used to organize and manage related data efficiently.
   -> Declaration and Usage :
      • Define a Struct:
          struct Person {
              string name;
              uint age;
          }
      • Create an Instance :
         Person public person;
         person = Person("Alice", 30);
 

5) Mapping Data Type :
    -> Mappings are key-value pairs used to store and retrieve values efficiently.
    -> Mappings are reference types and cannot be iterated directly.
    -> Declaration and Usage:
        • Declare a Mapping: mapping(address => uint) public balances;
        • Assign a Value: balances[msg.sender] = 100;
    -> Nested Mappings: mapping(address => mapping(uint => bool)) public nestedMapping;    

*/