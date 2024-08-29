const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.json()) // Middleware to parse JSON data
// 1. Middleware
app.use((req, res, next) => {
    console.log("Middleware 1");
    next();
});
app.use((req, res, next) => {
    console.log("Middleware 2");
    next();
});
app.use((req, res,next) => {
    console.log("Middleware 3");
    next()
});

// 2. Route Handler :  http://localhost:3000/?userName=Chetan
app.get('/user', (req, res) => {
    const { userName } = req.query // Extract the userName from the query parameters
    res.send(`Hello ${userName}`)  // Use template literals to insert userName into the response
});

/*
  POST : http://localhost:3000/

  JSON :
    {
    "userName":"chetan",
    "passWord":"1234567890"
    }

*/
app.post('/',(req,res)=>{
    const {userName , passWord} = req.body // Now you can access JSON data via req.body
    console.log(`userName : ${userName} passWord:${passWord}`)

})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
