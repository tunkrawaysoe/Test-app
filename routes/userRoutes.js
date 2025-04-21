import express from "express";
import { getUser,getUserFriends,addRemoveFriend} from "../controllers/userController.js";

const Router = express.Router();

//Getting user and userFriends
Router.get('/:id',getUser);
Router.get('/:id/friends',getUserFriends)

//Update
Router.patch('/:id/:friendId',addRemoveFriend)

export default Router;




