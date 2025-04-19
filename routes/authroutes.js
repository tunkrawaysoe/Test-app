import express from "express";
import { registerUser , loginUser} from "../controllers/authcontroller.js";

const Router = express.Router();

// Define routes
Router.post("/register", registerUser);
Router.post('/login',loginUser)

export default Router;
