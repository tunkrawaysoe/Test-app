import Post from '../models/Post.js';
import User from '../models/User.js';

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
   
    const user = await User.findById(userId);

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      picturePath,
      userPicturePath: user.picturePath,
      likes: {}, 
      comments: [],
    });

    await newPost.save();

    // Optionally return all posts after creating the new one
    const posts = await Post.find().sort({ createdAt: -1 }); // newest first; 
    res.status(201).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create post', error: error.message });
  }
};

export const getFeedPosts = async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 }); // newest first
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch feed posts', error: error.message });
    }
  };

export const getUserPosts = async (req, res) => {
    try {
      const { userId } = req.params;
      const posts = await Post.find({ userId }).sort({ createdAt: -1 }); // optional sorting
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch user posts', error: error.message });
    }
  };
export const likePost = async (req, res) => {
    try {
      const { postId } = req.params;
      const { userId } = req.body;

      
      if (!userId) {
        return res.status(400).json({ message: 'userId is required in the request body' });
      }
  
      // Find the post by ID
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Check if the user has already liked the post
      const isLiked = post.likes.get(userId);
  
      // Toggle the like status
      if (isLiked) {
        post.likes.delete(userId); // unlike
      } else {
        post.likes.set(userId, true); // like
      }
  
      // Update the post in the database and return the updated post
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { likes: post.likes },
        { new: true } // Return the updated post
      );
  
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: 'Failed to like/unlike post', error: error.message });
    }
  };
  