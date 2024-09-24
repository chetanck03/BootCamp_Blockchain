const express = require('express')
const router = express.Router()
const {authentication} = require("../middlewares/authentication")
const CandidateModel = require("../models/CandidateSchema")

router.post('/postCandidateImage',authentication,async(req,res)=>{
    try{
        console.log("postCandidate")
        // const {accountAddress,imageName}=req.body;

        // const saveCandidate = await CandidateModel.create({
        //     accountAddress:accountAddress,
        //     imageName:imageName
        // })
        // console.log(saveCandidate)
        // res.status(200).json(saveCandidate)

    }catch(error){
        console.log(error)
    }
})

module.exports=router;