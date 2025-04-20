import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile,
      impressions,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    // Salt and hash the password
    const salt = await bcrypt.genSalt(10); // 
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Store the hashed password, not the plain one
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000), // random value for example
      impressions: Math.floor(Math.random() * 1000), // random value for example
    });

    // Save the user to the database
    await newUser.save();

    // Return the response with user data
    res.status(201).json({ 
      message: "User registered successfully!",
      data: newUser 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user." });
  }
};

//Login user
export const loginUser = async (req,res) => {
 const {email,password} = req.body;
  try {
     // Check if user exists
     const user = await User.findOne({ email });
     if (!user) {
       return res.status(404).json({ message: "User not found" });
     }
 
     // Check password
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) {
       return res.status(400).json({ message: "Invalid credentials" });
     }

    // Create JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    
    // After verifying the password and generating the token
    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({
      message: "Login successful",
      token,
      user: userData,
    });
 
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
    
  }
  
}