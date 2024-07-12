# Overview

This Solidity contract provides a basic implementation for an election system, including the registration of voters and candidates. It includes age validation and ensures that each voter and candidate can only register once.

## Key Points

1. **State Variables**
    - `nextVoterId` and `nextCandidateId` are used to keep track of the IDs for voters and candidates respectively.

2. **Modifier**
    - `isValidAge`: Ensures the registrant is over 18 years old.

3. **Functions to Check Registration**
    - `isCandidateNotRegistered`: Checks if a candidate is already registered.
    - `isVoterNotRegistered`: Checks if a voter is already registered.

4. **Registration Functions**
    - `registerVoter`: Registers a voter with name, age, and gender, ensuring they haven't registered before and meet the age requirement.
    - `registerCandidate`: Registers a candidate with name, party, age, and gender, ensuring they haven't registered before, aren't the election commission, and that the registration cap isn't exceeded.

5. **Structs (Entities)**
    - `Voter`: Contains details about the voter such as name, age, gender, voter ID, and address.
    - `Candidate`: Contains details about the candidate such as name, party, age, gender, candidate ID, address, and votes.

## Notes on Solidity Features
1. **External Functions**
    - Used for functions that need to be accessed by other contracts or via transactions.
2. **Calldata**
    - Used in external functions for parameters; it's read-only and ensures data immutability.
3. **Curly Brackets**
    - Used to define structures (structs) for organizing complex data and improving code readability.
