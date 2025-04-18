import express from "express";
import { registerUser } from "../controllers/userController.js"; // Import registerUser from the appropriate controller file

const Router = express.Router();

// Define routes
Router.post("/register", registerUser);

export default Router;
