# Voting Smart Contract Overview

This Solidity contract implements a basic voting system where voters can cast their votes for candidates. The contract defines three main entities: Voter, Candidate, and Election Commission, and includes functionality for time-restricted voting.

## Contract Details

### Entities

1. **Voter**
   - **Attributes**:
     - `name`: Name of the voter
     - `age`: Age of the voter
     - `voterId`: Unique ID for the voter
     - `gender`: Gender of the voter (using the `Gender` enum)
     - `voterCandidateId`: ID of the candidate the voter has voted for
     - `voterAddress`: Ethereum address of the voter

2. **Candidate**
   - **Attributes**:
     - `name`: Name of the candidate
     - `party`: Political party of the candidate
     - `age`: Age of the candidate
     - `gender`: Gender of the candidate (using the `Gender` enum)
     - `candidateId`: Unique ID for the candidate
     - `candidateAddress`: Ethereum address of the candidate
     - `votes`: Number of votes received by the candidate

3. **Election Commission**
   - The address of the election commissioner who has special privileges in managing the contract.

### Modifiers

- `onlyComissioner`: Ensures that only the election commissioner can execute certain functions.
- `isVotingOver`: Ensures that the voting period is still ongoing.

### Voting Time Period

- `startTime`: The start time of the voting period.
- `endTime`: The end time of the voting period.
- `stopVoting`: A boolean flag to manually stop voting.

### Mappings

- `voterDetails`: Maps voter IDs to `Voter` structs.
- `candidateDetails`: Maps candidate IDs to `Candidate` structs.

### Enums

- `VotingStatus`: Represents the current status of the voting process (NotStarted, InProgress, Ended).
- `Gender`: Represents the gender of a voter or candidate (NotSpecified, Male, Female, Other).

### Functions

- `constructor`: Initializes the contract by setting the election commissioner to the address that deployed the contract.
- `time`: Returns the current block timestamp.

## Key Concepts

1. **msg.sender**
   - A global variable representing the address of the entity (person or smart contract) that called the current function.
   - Commonly used for access control, ensuring only authorized addresses can execute certain functions.
   - Example:
     ```solidity
     function transfer(address _to, uint _amount) public {
         require(msg.sender == owner, "Only the owner can transfer funds");
         // Transfer logic
     }
     ```

2. **block.timestamp**
   - A global variable in Solidity that returns the current block’s timestamp in Unix time (the number of seconds since January 1, 1970).
   - Used to get the exact time at which the block was mined, providing a way to timestamp events or implement time-dependent logic in smart contracts.
   - Example:
     ```solidity
     require(block.timestamp >= startTime, "Function can only be called after start time");
     ```

3. **enum**
   - A user-defined type in Solidity that represents a set of named values, which are called members. Enums are used to create custom types with a finite set of possible values.
   - Enhances code readability and maintainability by giving descriptive names to integer values, making the code more self-explanatory.
   - Example:
     ```solidity
     enum Role { User, Admin, SuperAdmin }
     Role public userRole;

     function setRole(Role _role) public {
         userRole = _role;
     }
     ```
