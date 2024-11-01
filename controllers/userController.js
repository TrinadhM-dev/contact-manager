const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//@desc Register a user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Check for required fields
    if (  !username || !email || !password) {
        res.status(400); // Changed to 400 for bad request
        throw new Error("All fields are required");
    }

    // Check if user already exists
    const userAvail = await User.findOne({ email });
    if (userAvail) {
        return res.status(400).json({ message: "User already exists" }); // Return here
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Use await for async operation
    console.log(hashedPassword);

    // Create a new user
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    if (newUser) {
        // Send success response
        res.status(201).json({ _id: newUser?.id, email: newUser?.email });
    } else {
        res.status(400);
        throw new Error("User not valid");
    }

});



const loginUser = asyncHandler(async (req, res) => {
    const {email,password} = req.body;
    if(!email || !password) {
        res.status(401).json({message:"All fields are must and mandatory!!"})
    }
    const user = await User.findOne({email});
    //compare password with bcrypt.js
    if(user && (await bcrypt.compare(password,user?.password))){

        const accessToken = jwt.sign({
            user:{
                username :user.username,
                email : user.email,
                id:user.id,
            }
        },process?.env?.ACCESS_TOKEN_SECRET,{expiresIn:"5m"});
        //This is where we use json webtoken.
        res.status(200).json({accessToken});
    }
    else{
        res.status(401)
        throw new Error("Email or Password not matched!!");
    }
    res.status(200).json("Login success!");
})


const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.user);
})

module.exports = { registerUser, loginUser,currentUser };