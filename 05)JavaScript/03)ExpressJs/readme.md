# Node.js Express Server

This project demonstrates how to create a basic server using Node.js and Express, including setting up middleware for handling requests. 

## Project Setup

Follow these steps to set up the project:

1. Initialize a new Node.js project:

    ```bash
    npm init -y
    ```

2. Install the required dependencies:

    - **Express**: A minimal and flexible Node.js web application framework.
    - **Nodemon**: A tool that helps develop Node.js-based applications by automatically restarting the node application when file changes are detected.

    ```bash
    npm install express
    npm install --save-dev nodemon
    ```

3. Create an `index.js` file for your server:

    ```bash
    touch index.js
    ```

4. In the `package.json` file, set up the start script to use Nodemon:

    ```json
    "scripts": {
        "start": "nodemon index.js"
    }
    ```

5. To start the server, run:

    ```bash
    npm start
    ```

## Creating the Server

Here’s how to create a simple server in the `index.js` file:

```javascript
// Import the Express module
const express = require('express');

// Create an instance of Express
const app = express();

// Define a port number
const PORT = process.env.PORT || 3000;

// Middleware example: log requests
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next(); // Move to the next middleware or route handler
});

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```
# Middleware in Node.js Express

Middleware in Express is a powerful tool that allows you to handle various tasks during the request-response cycle in a Node.js application. This document provides an overview of middleware and examples of how to implement it.

## What is Middleware?

Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the `next` middleware function in the application’s request-response cycle. These functions can perform various operations, such as:

- Executing code.
- Modifying the request and response objects.
- Ending the request-response cycle.
- Calling the next middleware function in the stack.

## Types of Middleware

1. **Application-Level Middleware**: This type of middleware is bound to an instance of `express()` using `app.use()` or `app.METHOD()` (where METHOD is an HTTP method like `GET`, `POST`, etc.).

2. **Router-Level Middleware**: Similar to application-level middleware but bound to an instance of `express.Router()`.

3. **Error-Handling Middleware**: Defined with four arguments instead of three: `(err, req, res, next)`. This middleware is specifically for handling errors in the application.

4. **Built-In Middleware**: Express comes with some built-in middleware functions, such as `express.json()` and `express.urlencoded()` for parsing request bodies.

5. **Third-Party Middleware**: You can also use middleware provided by third-party packages, such as `morgan` for logging or `body-parser` for parsing request bodies.

## Middleware Examples

### Example 1: Logging Middleware

This middleware logs the HTTP method and URL of every incoming request.

```javascript
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next(); // Proceed to the next middleware or route handler
});
```
### Example 2: JSON Parsing Middleware
This middleware automatically parses incoming JSON payloads and makes them available under `req.body`.

```javascript
app.use(express.json());
```

### Example 3: Custom Middleware
This middleware checks if the request body contains a `name` field and logs it. If the `name` field is missing, it logs a message indicating that.

```javascript
app.use((req, res, next) => {
    if (req.body.name) {
        console.log(`Name provided: ${req.body.name}`);
    } else {
        console.log('No name provided in the request body.');
    }
    next(); // Proceed to the next middleware or route handler
});
```
### Example 4: Error-Handling Middleware
This middleware catches errors and sends a response with the error message.
```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
```
