import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  InputBase,
  useTheme,
  useMediaQuery,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Search,
  DarkMode,
  LightMode,
  Message,
  Notifications,
  Help,
  Menu as MenuIcon,
  Close,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout, setMode } from '../state';
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../components/FlexBetween';

const NavBar = () => {
  const [isMobileMenuToggled, setMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)');
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const primaryLight = theme.palette.primary.light;
  const dark = theme.palette.neutral.dark;
  const alt = theme.palette.background.alt;
  const fullName = user ? `${user.firstName} ${user.lastName}` : 'Guest';

  const handleLogout = () => {
    dispatch(setLogout());
    navigate('/');
  };

  return (
    <FlexBetween
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1300, // higher than most components (like drawers, modals, etc.)
      backgroundColor: alt,
      padding: '1rem 6%',
    }}
  >
  
      {/* Left Side */}
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="secondary"
          onClick={() => navigate('/home')}
          sx={{
            ':hover': {
              color: primaryLight,
              cursor: 'pointer',
            },
          }}
        >
          Social Hub
        </Typography>

        {/* Search Bar */}
        {isNonMobileScreen && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="0.1rem 3rem"
            padding="0.1rem 1rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* Right Side */}
      {isNonMobileScreen ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkMode sx={{ fontSize: '25px' }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: '25px' }} />
            )}
          </IconButton>

          <Message sx={{ fontSize: '25px' }} />
          <Notifications sx={{ fontSize: '25px' }} />
          <Help sx={{ fontSize: '25px' }} />

          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: '150px',
                borderRadius: '0.25rem',
                padding: '0.25rem 1rem',
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setMobileMenuToggled(!isMobileMenuToggled)}>
          <MenuIcon />
        </IconButton>
      )}

      {/* Mobile Menu */}
      {!isNonMobileScreen && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={alt}
        >
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setMobileMenuToggled(false)}>
              <Close />
            </IconButton>
          </Box>

          <FlexBetween
            flexDirection="column"
            gap="2rem"
            justifyContent="center"
            padding="2rem"
          >
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === 'dark' ? (
                <DarkMode sx={{ fontSize: '25px' }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: '25px' }} />
              )}
            </IconButton>

            <Message sx={{ fontSize: '25px' }} />
            <Notifications sx={{ fontSize: '25px' }} />
            <Help sx={{ fontSize: '25px' }} />

            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: '150px',
                  borderRadius: '0.25rem',
                  padding: '0.25rem 1rem',
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default NavBar;
