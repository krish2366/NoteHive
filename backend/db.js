const mongoose = require("mongoose")
const mongoURI = "mongodb://localhost:27017/notebook"


const connectToMongo = async () =>{
    await mongoose.connect(mongoURI);
    console.log("Mongodb connected")
}


module.exports = connectToMongo