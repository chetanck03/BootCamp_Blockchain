# Project Setup

This guide walks you through the setup of the components and pages for a React-based voting application.

### Folder and Component Structure

#### 1. Pages Folder

- **Candidate Folder**:
  - Create a folder named `candidate`.
  - Inside this folder, create a `RegisterCandidate.jsx` component for handling candidate registration.

- **Voter Folder**:
  - Create a folder named `voter`.
  - Inside this folder, create a `RegisterVoter.jsx` component for handling voter registration.

#### 2. Web3 Context

- In the `context` folder, create the `useWeb3Context` component.
- This component will simplify the interaction with `Web3Context` and provide a centralized way to manage Web3 state.

#### 3. Get List of Candidates & Voters

- **Voter Folder**:
  - Inside the `voter` folder, create a `GetVoterList.jsx` component to fetch and display the list of voters.

- **Candidate Folder**:
  - Inside the `candidate` folder, create a `GetCandidateList.jsx` component to fetch and display the list of candidates.

#### 4. Components Folder

- **ElectionCommission Folder**:
  - Create a folder named `ElectionCommission`.
  - Inside this folder, create the following components: `AnnounceWinner`, `EmergencyDeclare`, and `VotingTimePeriod`.

- **Voter Folder**:
  - Inside the `components` folder, create a `Voter` folder.
  - Create a `CasteVote.jsx` file to handle the voting process.

- **Wallet Folder**:
  - Create a `Wallet` folder.
  - Inside this folder, create a `Wallet.jsx` component for managing wallet interactions.

#### 5. Routes Folder

### Install the Routes Package

First, install the required `react-router-dom` package to enable routing in the application:
 
```
npm i react-router-dom
```

- **Routes File**:
  - Create a file named `routes.jsx` inside the `routes` folder to define the application's routes.

- **App Update**:
  - Update the `App.jsx` file to include the routing setup and integrate the new components.
