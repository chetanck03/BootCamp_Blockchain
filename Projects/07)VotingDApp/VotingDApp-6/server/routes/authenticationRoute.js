const express = require('express')
const router = express.Router()
const {ethers} = require('ethers')
const jwt = require('jsonwebtoken')

router.post('/authentication',async(req,res)=>{
    try{
      const {accountAddress} = req.query;
      const {signature} = req.body
      
      if(!signature || !accountAddress){
        res.status(500).json({message:"Authentication Failed"})
      }
      
      const message = "Welcome to Voting Dapp. You accept our terms and condition"
      const recoverAddress = ethers.utils.verifyMessage(message,signature);
      
      if(recoverAddress.toLowerCase() === accountAddress.toLowerCase()){
        const token = jwt.sign({accountAddress},'secretKey')
        return res.status(200).json({message:"Authentication Successful", token:token})
      }else{
        throw new Error("Recovered address not same as account Address")
      }

    }catch(error){
        console.log(error)
        res.status(500).json({message:"Authentication failed"})
    }
})

module.exports=router;