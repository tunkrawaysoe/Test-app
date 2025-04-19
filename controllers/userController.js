import User from "../models/User.js";

export const getUser = async (req,res) => {
    try {
        const {id} = req.params; // 
        const user = await User.findById(id).select('-password'); // exclude password
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
    
}

export const getUserFriends = async (req,res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      console.log(user.friends)
  
      const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );
  
      const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => ({
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        })
      );
  
      res.status(200).json(formattedFriends);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  
