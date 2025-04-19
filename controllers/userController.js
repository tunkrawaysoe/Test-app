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