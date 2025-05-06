import express from "express";
import { registerUser , loginUser} from "../controllers/authcontroller.js";
import upload from "../middlewares/upload.js";

const Router = express.Router();

// Define routes
Router.post("/register", upload.single("picture"), registerUser);
Router.post('/login',loginUser)

export default Router;
