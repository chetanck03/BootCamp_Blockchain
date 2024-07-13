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
    address public winner;

    
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

    // enum :            0          1         2
    enum VotingStatus {NotStarted,InProgress,Ended}
    enum Gender {NotSpecified,Male,Female,Other}
    //               0          1     2     3
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

/*----------------------------------------------Third Part---------------------------------------------------------*/

    // Candidate List & Voter List

    function getCandidateList() public view returns (Candidate[] memory){ 

        Candidate[] memory candidateList = new Candidate[](nextCandidateId -1); // initialize an empty array of length
        for (uint i=0; i<candidateList.length; i++) 
        {
            candidateList[i]= candidateDetails[i+1]; // Mapping convert into the Array
        }
        return candidateList;
    }

    function getVoterList() public view returns (Voter[] memory){ 

        Voter[] memory voterList = new Voter[](nextVoterId -1); // initialize an empty array of length
        
        for (uint i=0; i<voterList.length; i++) 
        {
            voterList[i]= voterDetails[i+1]; // Mapping convert into the Array
        }
        return voterList;
    }


    // Voting

    function Voting(uint _voterId,uint _candidateId) external isVotingOver(){

        require(voterDetails[_voterId].voterAddress == msg.sender,"You are not registered for the Voting");
         require(voterDetails[_voterId].voterCandidateId == 0,"You have already voted");
         require(candidateDetails[_candidateId].candidateId == _candidateId,"Candidate id not found");
         require(msg.sender != candidateDetails[_candidateId].candidateAddress,"Candidate not allowed to vote");
         require(voterDetails[_voterId].age>18,"Not Eligible for Voting"); 
         require(block.timestamp<=endTime && stopVoting==false,"Voting time is over"); 

         voterDetails[_voterId].voterCandidateId=_candidateId; // update the voter candidate id 
         candidateDetails[_candidateId].votes++; // increment the votes of the candidate
    
    }

    //  set Voting Peroid
    function setVotingPeroid(uint _startTimeDuration,uint _endTimeDuration) external onlyComissioner(){

        require(_startTimeDuration<_endTimeDuration,"Start time must be less than end time"); 

        startTime = block.timestamp+_startTimeDuration;
        endTime= startTime+_endTimeDuration;
    }

    // Show the Voting Status

    function getVotingStatus() public view returns (VotingStatus){
        if (block.timestamp<startTime) {
            return VotingStatus.NotStarted; // 0
         } else if (block.timestamp>endTime && stopVoting==false) {
            return VotingStatus.Ended; // 2
         } else {
            return VotingStatus.InProgress; // 1
         }
        
    }

    // Voting Result 

    function announceVotingResult() external onlyComissioner(){
        uint maxVotes =0;
        for(uint i=1;i<nextCandidateId;i++){
            if(candidateDetails[i].votes>maxVotes){
                maxVotes=candidateDetails[i].votes;
                winner=candidateDetails[i].candidateAddress;
            }
        }
    }
    
}