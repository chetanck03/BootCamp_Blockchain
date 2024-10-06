const express = require('express')
const router = express.Router()
const {authentication} = require("../middlewares/authentication")
const CandidateModel = require("../models/CandidateSchema")
const multer = require("../middlewares/multer")

router.post('/postCandidateImage',authentication,multer.uploadCandidate,async(req,res)=>{
    try{
        const {accountAddress}=req;
        const imageName = req.file.filename;
        
        await CandidateModel.create({
            accountAddress,
            imageName
        })
        res.status(200).json({message:"successful"})

    }catch(error){
        console.log(error)
    }
})

module.exports=router;