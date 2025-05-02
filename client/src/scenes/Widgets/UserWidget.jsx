import React from 'react'
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import FlexBetween from '../../components/FlexBetween';
import UserImage from '../../components/UserImage';
import WidgetWrapper  from '../../components/WidgetWrapper';
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserWidget = ({userId,picturePath}) => {
  const [user,setUser] = useState(null)
  const {palette} = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state)=>state.token)
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main; 
  const getUser = async () => {
    const response = await fetch(`http://localhost:3000/users/68038c504894abecb2ef55a1`,
      {
        method : "GET",
        headers : { Authorization : `Bearer ${token}`}
      }
    );
    const data = await response.json()
    setUser(data);    
  };

  useEffect(()=>{
    getUser();
  },[])

  if(!user){
    return null;
  }
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
    <WidgetWrapper>
      {/* first row */}
      <FlexBetween
       gap='1rem'>
        <FlexBetween
        gap='1rem'>
          <UserImage imgsrc='../../src/post8.jpeg'/>
          <Box>
            <Typography>
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>
             {0} {friends.length < 1 ? "friend" : 'friends'}
            </Typography>
          </Box>
        </FlexBetween> 
        <ManageAccountsOutlined/>
      </FlexBetween>
      <Divider/>
      {/* Second Row*/}
      <Box padding='1rem 0'>
        <Box display='flex'  gap='1rem' alignItems='center'mb='0.5rem'>
          <LocationOnOutlined/>
          <Typography color={medium} >
            {location}
          </Typography>
        </Box>
        <Box display='flex' gap='1rem' alignItems='center'>
          <WorkOutlineOutlined/>
          <Typography color={medium}>
            {occupation}
          </Typography>
        </Box>
       </Box>
       <Divider/>
       {/* Third Row*/}
       <Box padding='1rem 0'>
        <FlexBetween mb='0.5rem'>
          <Typography color={medium}>
            Who's view your profile
          </Typography>
          <Typography>
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
        <Typography color={medium}>
            Impressions of your post
          </Typography>
          <Typography>
            {impressions}
          </Typography>
        </FlexBetween>
       </Box>
       <Divider/>
       {/* Fourth Row */}
       <Box padding='1rem 0'>
        <Typography mb='0.5rem'>
          Social Profiles
        </Typography>
        <FlexBetween>
          <FlexBetween gap='1rem' mb='0.5rem' >
            <img src='../../src/assets/twitter.png' alt='twitter'/>
            <Box>
              <Typography>
                Twitter
              </Typography>
              <Typography color = {medium}>
                Social Network
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined/>
        </FlexBetween>  
        <FlexBetween>
          <FlexBetween gap='1rem'>
            <img src='../../src/assets/twitter.png' alt='twitter'/>
            <Box>
              <Typography>
                Twitter
              </Typography>
              <Typography color = {medium}>
                Social Network
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined/>
        </FlexBetween>   
       </Box>
       
    </WidgetWrapper>
  )
}

export default UserWidget