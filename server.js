const express=require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
connectDb()
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
//middleware
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use(errorHandler);



const port = process.env['port'] || 2000
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
    
})