import React from 'react';
import NavBar from '../navbar/index';
import { Box, useMediaQuery } from '@mui/material';
import UserWidget from './Widgets/UserWidget';
import { useSelector } from 'react-redux';
import PostWidget from './Widgets/PostWidget';
import MyPostWidget from './Widgets/MyPostWidget';
import AdvertWidget from './Widgets/AdvertWidget';
import FriendListWidget from './Widgets/FriendListWidget';


const HomePage = () => {
  const isNonMobileScreens = useMediaQuery('(min-width : 1000px)');
  const {_id,picturePath} = useSelector((state)=>state.user)
  
  
  return (    
    <Box>
      <NavBar />
      <Box
        width='100%' 
        padding='2rem 6%' 
        display={isNonMobileScreens ? 'flex' : 'block'}
        justifyContent='space-between'
        gap='2rem'
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} /> 
        </Box>
        
        <Box flexBasis={isNonMobileScreens ? '42%' : undefined}>
          <MyPostWidget picturePath={picturePath}/>
          <PostWidget/> 
        </Box>
        
        {isNonMobileScreens && (
          <Box flexBasis='26%'>
            {/* Right sidebar content goes here */}
            <AdvertWidget/>
            <FriendListWidget userId={_id}/>
          </Box>

        )}
      </Box>
    </Box>
  );
}

export default HomePage;
