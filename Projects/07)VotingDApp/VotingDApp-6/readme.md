# Voting DApp

This is a decentralized voting application built on the Ethereum blockchain. The project consists of two main components: 
- client (frontend) 
- server (backend). 

## Project Structure


## Client

The client folder contains the frontend application built with React. This application allows users to interact with the voting DApp, including casting votes, viewing candidates, and checking results.

### Installation

1. Navigate to the client folder.
```
cd client
```
2. Install the required dependencies using npm :

```
npm install
```

### Running the Client :

To run the client application locally, use the start command.

```
npm run dev
```
 The application will be available at `http://localhost:5173`.



## Server

The server folder contains the backend application built with Node.js and Express. It handles requests from the client, manages blockchain interactions, and serves the frontend application.

### Installation

1. Navigate to the server folder.
```
cd server
```
2. Install the required dependencies using npm.

```
npm install
```

3. set up `.env` file :
```
MONGO_URL =
```
### Running the Server

To start the backend server, use the start command

```
npm start
```
 The server will run on `http://localhost:3000`.

