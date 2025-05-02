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
          <UserImage image={picturePath}/>
          <Box>
            <Typography>
              {firstName} {lastName}
            </Typography>
            <Typography>
             {0} {friends.length < 1 ? "friend" : 'friends'}
            </Typography>
          </Box>
        </FlexBetween> 
        <ManageAccountsOutlined/>
      </FlexBetween>
    </WidgetWrapper>
  )
}

export default UserWidget