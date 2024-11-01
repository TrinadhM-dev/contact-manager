const mongoose = require("mongoose");

const connectDb = async(req,res)=>{
    try{
        const connect = await mongoose.connect(process.env.CONNECT_URL)
        console.log("connected db successfully",connect.connection.host,connect.connection.name);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}


module.exports = connectDb;