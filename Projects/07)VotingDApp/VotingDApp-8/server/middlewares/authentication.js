const jwt = require('jsonwebtoken')

const authentication = (req,res,next)=>{
    const token = req.headers['x-access-token']
    console.log(token)

    if(!token){
        res.status(500).json({message:"Authentication Failed"})
    }

    const decoded =  jwt.verify(token,'secretKey')
    console.log(decoded)
    
    req.accountAddress = decoded.accountAddress
    next()
   
}
module.exports={authentication}