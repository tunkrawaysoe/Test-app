import express from "express";
import { getUser,getUserFriends,addRemoveFriend} from "../controllers/userController.js";
import verifyToken from "../middlewares/authorization.js";

const Router = express.Router();

//Getting user and userFriends
Router.get('/:id',verifyToken,getUser);
Router.get('/:id/friends',verifyToken,getUserFriends)

//Update
Router.patch('/:id/:friendId',verifyToken,addRemoveFriend)

export default Router;




