import React from 'react';
import {
  PersonAddOutlined,
  PersonRemoveOutlined
} from '@mui/icons-material';
import {
  Box,
  IconButton,
  Typography,
  useTheme
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';
import { useNavigate } from 'react-router-dom';
import { setFriends } from '../state';

const Friend = ({ friendId ,name,location}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const _id = user?._id;
  const friends = user?.friends || [];

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    if (!_id || !token) return;

    try {
      const response = await fetch(`http://localhost:3000/users/${_id}/${friendId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Failed to update friend list');
        return;
      }

      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (err) {
      console.error('Error updating friend:', err);
    }
  };


  return (
    <FlexBetween>
      <FlexBetween gap='1rem'>
        <UserImage/>
        <Box onClick = {()=> {
            navigate(`profile/${friendId}`)
            navigate(0)
        }}>
            <Typography color={main} variant='h5' fontWeight={500} sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}>
                {name ? name : "Guest"}
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
            {location ? location : ''}

            </Typography>
        </Box>
        
      </FlexBetween>
      <IconButton onClick={()=>patchFriend()} sx={{ backgroundColor: primaryLight, p: "0.4rem" }}>
        {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }}/>
        )
        :
        (
            <PersonAddOutlined sx={{ color: primaryDark }}/>
        )
    }
      </IconButton>

    </FlexBetween>
  );
};

export default Friend;
