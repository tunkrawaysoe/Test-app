import express from "express";
import { getUser } from "../controllers/userController.js";

const Router = express.Router();

//Getting user 
Router.get('/:id',getUser);

export default Router;




