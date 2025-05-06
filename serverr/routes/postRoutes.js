import express from 'express'
import { getFeedPosts,createPost,getUserPosts,likePost } from '../controllers/postController.js';
import verifyToken from '../middlewares/authorization.js';

const Router = express.Router();

//creating post
Router.post('/',createPost)


//getting posts
Router.get('/',verifyToken,getFeedPosts)
Router.get('/:userId/posts',verifyToken,getUserPosts)

//updating posts
Router.patch('/:postId/like',verifyToken,likePost)

export default Router;
