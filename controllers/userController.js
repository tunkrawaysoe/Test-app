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
    
};

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

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    console.log(`${id} and ${friendId}`);

    if (id === friendId) {
      return res.status(400).json({ message: "You can't add or remove yourself as a friend." });
    }

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isFriend = user.friends.includes(friendId);

    if (isFriend) {
      user.friends = user.friends.filter(fid => fid.toString() !== friendId);
      friend.friends = friend.friends.filter(fid => fid.toString() !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends
      .filter(friend => friend !== null)
      .map(({ _id, firstName, lastName, occupation, location, picturePath }) => ({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
      }));

    res.status(200).json(formattedFriends);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong.', error: err.message });
  }
};



  
