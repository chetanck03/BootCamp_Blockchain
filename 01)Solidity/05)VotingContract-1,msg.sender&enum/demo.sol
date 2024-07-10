// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Vote{

    // First Entity
    struct Voter{
        string name;
        uint age;
        uint voterId;
        Gender gender;
        uint voterCandidateId;//candidate id to whom the voter has voted
        address voterAddress;//EOA (Externally Owned Account)
    }

    // Second Entity
    struct Candidate{
        string name;
        string party;
        uint age;
        Gender gender;
        uint candidateId;
        address candidateAddress; //EOA (Externally Owned Account)
        uint votes; // number of votes
    }

    // Third Entity
    address public electionComission;

    
    constructor(){
        electionComission=msg.sender;
    }

    modifier onlyComissioner(){
        require(msg.sender==electionComission,"Not authuorized");
        _;
    }

    // voting time period

    uint startTime;
    uint endTime;
    bool stopVoting;

     modifier isVotingOver(){
        require(block.timestamp<=endTime && stopVoting==false,"Voting time is over");
        _;
    }

    // Mapping
    mapping (uint=>Voter) voterDetails;
    mapping (uint=>Candidate) candidateDetails;

    // enum
    enum VotingStatus {NotStarted,InProgress,Ended}
    enum Gender {NotSpecified,Male,Female,Other}
    function time() public view  returns(uint){
        return block.timestamp;
    }
}

/*

 1) msg.sender :
   ->  A global variable representing the address of the entity (person or smart contract) that called the current function.
   ->  Commonly used for access control, ensuring only authorized addresses can execute certain functions.
   -> Example :
            function transfer(address _to, uint _amount) public {
                require(msg.sender == owner, "Only the owner can transfer funds");
                // Transfer logic
            }

 2) block.timestamp :
   -> A global variable in Solidity that returns the current block’s timestamp in Unix time (the number of seconds since January 1, 1970).
   -> Used to get the exact time at which the block was mined, providing a way to timestamp events or implement time-dependent logic in smart contracts.
   -> Example :   
       require(block.timestamp >= startTime, "Function can only be called after start time");

 3) enum :
   -> A user-defined type in Solidity that represents a set of named values, which are called members. Enums are used to create custom types with a finite set of possible values
   -> Enhances code readability and maintainability by giving descriptive names to integer values, making the code more self-explanatory
   -> Example :  
        enum Role { User, Admin, SuperAdmin }
        Role public userRole;

        function setRole(Role _role) public {
                userRole = _role;
        }
*/