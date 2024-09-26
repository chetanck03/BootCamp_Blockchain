const express = require('express')
const router = express.Router()
const { authentication } = require('../middlewares/authentication')
const multer = require('../middlewares/multer')


router.post('/postVoterImage',authentication,multer.uploadVoter , async(req,res)=>{
    try {
        console.log("postVoterImage")

     
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;