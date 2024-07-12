// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Vote{

    // First Entity
    struct Voter{
        string name;
        uint age;
        uint voterId;
        Gender gender;
        uint voterCandidateId;
        address voterAddress;
    }

    // Second Entity
    struct Candidate{
        string name;
        string party;
        uint age;
        Gender gender;
        uint candidateId;
        address candidateAddress; 
        uint votes; 
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

/*----------------------------------------------Second Part---------------------------------------------------------*/
   uint nextVoterId=1;
   uint nextCandidateId =1;

// isValidAge
    modifier isValidAge(uint _age){
        require(_age>18,"Not Eligible for Voting");
        _;
    }

// Check Candidates & Voters register only one time

  function isCandidateNotRegistered(address _person) private view returns(bool){
    for (uint i=1; i<nextCandidateId; i++) 
    {
        if (candidateDetails[i].candidateAddress==_person) {
            return false;
        }
    }
    return true;
  }

  function isVoterNotRegistered(address _person) private view returns(bool){
    for (uint i=1; i<nextVoterId; i++) 
    {
        if (voterDetails[i].voterAddress==_person) {
            return false;
        }
    }
    return true;
  }

// Register Voter & Candidate : 


     /*
      First Entity Like :
    
        struct Voter{
            string name;
            uint age;
            uint voterId;
            Gender gender;
            uint voterCandidateId;
            address voterAddress;
        }

    */

    function registerVoter(
        string calldata _name,
        uint _age,
        Gender _gender
    )external isValidAge(_age){
        require(isVoterNotRegistered(msg.sender),"You are Already Registered for the Voter");

        voterDetails[nextVoterId]=Voter({
            name:_name,
            age:_age,
            voterId:nextVoterId,
            gender:_gender,
            voterCandidateId:0,
            voterAddress:msg.sender
        });

        nextVoterId++;
    }

     /*
     Second Entity Like :

      struct Candidate{
        string name;
        string party;
        uint age;
        Gender gender;
        uint candidateId;
        address candidateAddress; 
        uint votes; 
       }
    */

    function registerCandidate(
        string calldata _name,
        string calldata _party,
        uint _age,
        Gender _gender
    )external isValidAge(_age){

        require(isCandidateNotRegistered(msg.sender),"You are Already Registered for the Candidate");
        require(msg.sender!=electionComission,"Election Comission not allowed to register");
        require(nextCandidateId<3,"Candidate Registration is Full !");

        candidateDetails[nextCandidateId] = Candidate({
            name:_name,
            party:_party,
            age:_age,
            gender:_gender,
            candidateId:nextCandidateId,
            candidateAddress:msg.sender,
            votes:0
        });
        nextCandidateId++;
    }

}

/*
  1) External Functions:
    -> Functions defined with the external keyword can be called from other contracts and via transactions.
    -> Usage: Typically used for functions meant to be accessed by other contracts or externall.

  2) calldata:
    -> Usage in External Functions: Parameters in external functions use calldata by default.
    -> A special data location that contains function arguments and is read-only.
    -> Immutability: Guarantees that the data cannot be modified, ensuring security and stability.  
  
  3) Cruly Brackets:
    -> Defined using the struct keyword followed by the struct name and a list of variables enclosed in curly brackets {}.
    -> Useful for organizing complex data and improving code readability.
*/
