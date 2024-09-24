const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3000
require('dotenv').config()

const connectDB = require('./db/connect')
const candidateRoutes = require("./routes/candidateRoutes")
const authenticationRoute = require("./routes/authenticationRoute")

app.use(cors())
app.use(express.json())

app.use("/api",authenticationRoute)
app.use("/api",candidateRoutes)

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