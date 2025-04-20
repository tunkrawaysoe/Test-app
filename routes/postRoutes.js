import express from 'express'
import { getFeedPosts,createPost,getUserPosts,likePost } from '../controllers/postController.js';

const Router = express.Router();

//creating post
Router.post('/',createPost)


//getting posts
Router.get('/',getFeedPosts)
Router.get('/:userId/posts',getUserPosts)

//updating posts
Router.patch('/:postId/like',likePost)

export default Router;
