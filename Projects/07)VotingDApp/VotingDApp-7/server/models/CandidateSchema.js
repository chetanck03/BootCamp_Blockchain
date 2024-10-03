const mongoose = require('mongoose')

const CandidateSchema= new mongoose.Schema({
     
    accountAddress:{
        type:String,
        required:true
    },
    imageName:{
        type:String,
        required:true
    }
})
const CandidateModel = mongoose.model("candidates",CandidateSchema)
module.exports= CandidateModel;