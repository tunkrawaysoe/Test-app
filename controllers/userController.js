import mongoose from "mongoose";
import User from "../models/User.js"; // Import your User model
import bcrypt from "bcryptjs"; // Corrected the typo

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
    const salt = await bcrypt.genSalt(10); // 10 rounds of salting (you can adjust this)
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
