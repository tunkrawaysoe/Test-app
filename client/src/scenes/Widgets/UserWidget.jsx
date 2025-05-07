import React, { useState, useEffect } from 'react';
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material';
import { Box, Typography, Divider, useTheme } from '@mui/material';
import FlexBetween from '../../components/FlexBetween';
import UserImage from '../../components/UserImage';
import WidgetWrapper from '../../components/WidgetWrapper';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    if (!token) {
      // Guest mode fallback data
      setUser({
        firstName: 'Guest',
        lastName: 'User',
        location: 'Unknown',
        occupation: 'Visitor',
        viewedProfile: 0,
        impressions: 0,
        friends: [],
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper mb='1rem'>
      {/* First Row */}
      <FlexBetween gap="1rem" pb="1.1rem">
        <FlexBetween gap="1rem" onClick={()=>navigate(`/profile/${userId}`)}>
          <UserImage image= {picturePath}  />
          <Box>
            <Typography fontWeight="500" variant="h6" color={dark} sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }} >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>
              {friends.length} {friends.length === 1 ? 'friend' : 'friends'}
            </Typography>
          </Box>
        </FlexBetween>
        {token && <ManageAccountsOutlined />}
      </FlexBetween>

      <Divider />

      {/* Second Row */}
      <Box padding="1rem 0">
        <Box display="flex" gap="1rem" alignItems="center" mb="0.5rem">
          <LocationOnOutlined />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" gap="1rem" alignItems="center">
          <WorkOutlineOutlined />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* Third Row */}
      <Box padding="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography>{viewedProfile}</Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography>{impressions}</Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* Fourth Row */}
      <Box padding="1rem 0">
        <Typography mb="0.5rem">Social Profiles</Typography>

        {/* Twitter */}
        <FlexBetween>
          <FlexBetween gap="1rem" mb="0.5rem">
            <img src="../../src/assets/twitter.png" alt="twitter" width={24} />
            <Box>
              <Typography>Twitter</Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          {token && <EditOutlined />}
        </FlexBetween>

        {/* LinkedIn (Placeholder) */}
        <FlexBetween>
          <FlexBetween gap="1rem">
            <img src="../../src/assets/twitter.png" alt="linkedin" width={24} />
            <Box>
              <Typography>LinkedIn</Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          {token && <EditOutlined />}
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
