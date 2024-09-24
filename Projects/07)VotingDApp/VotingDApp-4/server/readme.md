# Project Setup

## Set Up the Server

To install all the required packages, run the following commands:

```bash
npm i express           # For server creation
npm i mongoose          # For MongoDB connection and data modeling
npm i dotenv            # For environment variable management
npm install cors        # To enable CORS for cross-origin requests
npm install jsonwebtoken # For JWT-based authentication
npm i ethers@5.7.0      # For interacting with the Ethereum blockchain
npm i nodemon           # For auto-restarting the server during development
npm i mongodb           # MongoDB driver for direct MongoDB interactions
```
# Project Setup

## Folder Structure Setup

Follow these steps to set up the necessary folder structure and files:

1. **Create the `index.js` file**:
   - This file will be the entry point for your server.
   - It should include the code to set up the Express server and connect to MongoDB.

2. **Create the `db` folder**:
   - In this folder, create a file to handle MongoDB connection logic (e.g., `db/connect.js`).

3. **Create the `models` folder**:
   - Inside `models`, create a file `CandidateSchema.js`.
   - This file will define the schema for the `Candidate` model using Mongoose.

4. **Create the `routes` folder**:
   - Inside `routes`, create two files:
     - `authenticationRoute.js` for handling authentication-related routes.
     - `candidateRoutes.js` for handling candidate registration and related operations.

5. **Create the `middleware` folder**:
   - Inside `middleware`, create a file `authentication.js`.
   - This file will handle middleware logic for authenticating requests, such as verifying JWT tokens.

## To Run the Server

Once everything is set up, you can start the server by running:

```bash
npm start
```