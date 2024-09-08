const express = require("express")
const cors = require("cors")
const app = express()

const PORT = 3000

app.use(cors())
app.use(express.json())

app.post('/user',(req,res)=>{
    const {username,password} = req.body

    console.log("username:" ,username,"Password:",password)

    if(!username || !password){
        res.status(400).json({message:"Failed"})
    }
    res.status(200).json({message:"Successful"})

})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})