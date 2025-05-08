import React from 'react';
import NavBar from '../navbar/index';
import { Box, Typography, useMediaQuery,useTheme } from '@mui/material';
import Form from '../components/Form'
const HomePage = () => {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery('(min-width:1000px)');

  return (    
    <Box>
      <Box width="100%" textAlign="center">
        <Typography fontSize={30} fontWeight="bold" color="primary" backgroundColor={theme.palette.background.alt}
        p="1rem 6%">
          Social Hub
        </Typography>
      </Box>

      <Box 
        width={isNonMobileScreen ? '50%' : '95%'} 
        p="2rem" 
        m="3rem auto" 
        backgroundColor={theme.palette.background.paper}
        borderRadius="0.75rem"
        boxShadow="0 2px 8px rgba(0,0,0,0.1)"
      >
        <Typography fontWeight="500" variant="h5" mb={3}>
          Welcome to Social Hub
        </Typography>
        {/* You can place forms, feed, or user info here */}
        <Form/>
      </Box>
    </Box>
  );
};

export default HomePage;
