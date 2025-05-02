import React from 'react';
import NavBar from '../navbar/index';
import { Box } from '@mui/material';
import UserWidget from './Widgets/UserWidget';

const HomePage = () => {

  return (    
    <Box>
      <NavBar />
      <UserWidget/>
    
      
    </Box>
  );
}

export default HomePage;
