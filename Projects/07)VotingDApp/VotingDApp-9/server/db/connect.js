const mongoose = require('mongoose')

const connectDB = (url) =>{
    return mongoose.connect(url)
}

module.exports=connectDB;

// db/connect.js
// const mongoose = require('mongoose');

// const connectDB = (url) => {
//     return mongoose.connect(url, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });
// };

// module.exports = connectDB;