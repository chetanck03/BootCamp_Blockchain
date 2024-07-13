# Vote Smart Contract

This Solidity smart contract implements a voting system where eligible voters can register, candidates can register, and voting can take place within a specified period. The contract includes functionality for registering voters and candidates, voting, and announcing the result.

## Features

### Structs

- **Voter**: Contains information about each voter such as name, age, voter ID, gender, candidate voted for, and address.
- **Candidate**: Contains information about each candidate such as name, party, age, gender, candidate ID, address, and vote count.

### Enums

- **VotingStatus**: Represents the current status of the voting process (`NotStarted`, `InProgress`, `Ended`).
- **Gender**: Represents the gender of voters and candidates (`NotSpecified`, `Male`, `Female`, `Other`).

### State Variables

- **electionComission**: The address of the election commissioner.
- **startTime**: The start time of the voting period.
- **endTime**: The end time of the voting period.
- **stopVoting**: A boolean flag to stop the voting process.
- **nextVoterId**: The ID for the next voter to be registered.
- **nextCandidateId**: The ID for the next candidate to be registered.

### Mappings

- **voterDetails**: Maps voter IDs to their corresponding `Voter` struct.
- **candidateDetails**: Maps candidate IDs to their corresponding `Candidate` struct.

### Winner Details

- **winnerId**: The ID of the winning candidate.
- **winnerName**: The name of the winning candidate.
- **winnerVotes**: The number of votes received by the winning candidate.
- **winnerAddress**: The address of the winning candidate.

### Modifiers

- **onlyComissioner**: Ensures that only the election commissioner can execute certain functions.
- **isVotingOver**: Ensures that voting is only allowed during the specified voting period.
- **isValidAge**: Ensures that only individuals aged 18 and above can register as voters or candidates.

### Functions

#### Registration Functions

- **registerVoter**: Registers a voter with the provided details if they are not already registered and are of valid age.
- **registerCandidate**: Registers a candidate with the provided details if they are not already registered, are of valid age, and are not the election commissioner.

#### Utility Functions

- **isCandidateNotRegistered**: Checks if a person is not already registered as a candidate.
- **isVoterNotRegistered**: Checks if a person is not already registered as a voter.

#### Voting Functions

- **vote**: Allows a registered voter to vote for a registered candidate during the voting period.

#### Administrative Functions

- **setVotingPeriod**: Sets the start and end time for the voting period.
- **StopVoting**: Stops the voting process.
- **getVotingStatus**: Returns the current status of the voting process.
- **announceVotingResult**: Announces the result of the voting, identifying the candidate with the highest votes.

#### Getter Functions

- **getCandidateList**: Returns a list of all registered candidates.
- **getVoterList**: Returns a list of all registered voters.
