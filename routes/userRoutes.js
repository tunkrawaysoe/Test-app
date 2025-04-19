import express from "express";
import { getUser,getUserFriends } from "../controllers/userController.js";

const Router = express.Router();

//Getting user and userFriends
Router.get('/:id',getUser);
Router.get('/:id/friends',getUserFriends)


export default Router;




