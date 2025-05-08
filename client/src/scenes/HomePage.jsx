import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import UserWidget from './Widgets/UserWidget';
import { useSelector } from 'react-redux';
import PostsWidget from './Widgets/PostsWidget';
import MyPostWidget from './Widgets/MyPostWidget';
import FriendListWidget from './Widgets/FriendListWidget';


const HomePage = () => {
  const isNonMobileScreens = useMediaQuery('(min-width : 1000px)');
  const {_id,picturePath} = useSelector((state)=>state.user)
  
  
  return (    
    <Box >
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
        
        <Box 
            flexBasis={isNonMobileScreens ? '42%' : undefined}
            mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPostWidget picturePath={picturePath} userId={_id}/>
          <PostsWidget userId={_id}/>
        </Box>
        
        {isNonMobileScreens && (
          <Box flexBasis='26%'>
            {/* Right sidebar content goes here */}
            <FriendListWidget userId={_id}/>
          </Box>

        )}
      </Box>
    </Box>
  );
}

export default HomePage;
