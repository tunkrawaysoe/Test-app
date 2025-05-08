import React, { useEffect } from 'react';
import WidgetWrapper from '../../components/WidgetWrapper';
import Friend from '../../components/Friend';
import { Box, Typography } from '@mui/material';
import { setFriends } from '../../state';
import { useDispatch, useSelector } from 'react-redux';

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const {friends} = useSelector((state)=>state.user)
  
  const getUserFriends = async () => {
    const response = await fetch(
      `http://localhost:3000/users/${userId}/friends`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getUserFriends();
  }, []); 
  console.log(userId)

  return (
    <WidgetWrapper  >
      <Typography variant="h6" sx={{ mb: '1rem' }}>
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1rem">
        {friends?.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            location={friend.occupation} // was incorrectly using friends.occupation
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
