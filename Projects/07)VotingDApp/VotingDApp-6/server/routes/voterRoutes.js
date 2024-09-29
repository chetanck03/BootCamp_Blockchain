const express = require('express')
const router = express.Router()
const {authentication} = require("../middlewares/authentication")
const multer = require("../middlewares/multer")

const VoterModel = require("../models/VoterSchema")

router.post('/postVoterImage', authentication , multer.uploadVoter ,async(req,res)=>{
    try{
        const {accountAddress}=req;
        const imageName = req.file.filename;
        
        await VoterModel.create({
            accountAddress,
            imageName
        })
        res.status(200).json({message:"successful"})


    }catch(error){
        console.log(error)
    }
})

module.exports = router;