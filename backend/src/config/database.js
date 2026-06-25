// const mongoose = require("mongoose");
import mongoose from "mongoose"
 

async function connectDB(params) {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("GenAiDatabase connected")
    }
    catch(err){
          console.log(err)
         
    }
}
export default connectDB