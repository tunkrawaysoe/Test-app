import React from 'react';
import NavBar from '../navbar/index';
import { Box, useMediaQuery } from '@mui/material';
import UserWidget from './Widgets/UserWidget';
import { Block } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import PostWidget from './Widgets/PostWidget';

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery('(min-width : 1000px)')
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
        <Box flexBasis={isNonMobileScreens ? '26%' :  undefined}>
          <UserWidget/> 
        </Box>
        <Box flexBasis={isNonMobileScreens ? '42%' :  undefined}>
          <PostWidget/> 
        </Box>
        
        
      </Box>
    </Box>
  );
}

export default HomePage;
