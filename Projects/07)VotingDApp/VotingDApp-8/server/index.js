const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

const PORT = 3000
require('dotenv').config()

const connectDB = require('./db/connect')
const authenticationRoute = require("./routes/authenticationRoute")
const candidateRoutes = require("./routes/candidateRoutes")
const voterRoutes = require("./routes/voterRoutes")

app.use(cors())
app.use(express.json())

app.use("/api",authenticationRoute)
app.use("/api",candidateRoutes)
app.use("/api",voterRoutes)
app.use('/images',express.static(path.join(__dirname,'votingSystem')))


connectDB(process.env.MONGO_URL)
.then(
    ()=>{
        console.log("Database connected")
        app.listen(PORT,()=>{
            console.log(`server is running on http://localhost:${PORT}/`)
        })
    }
)
.catch((error)=>{
    console.log(error)
})