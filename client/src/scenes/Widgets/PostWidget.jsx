import React from 'react'
import WidgetWrapper from '../../components/WidgetWrapper'
import { Box,Divider,Typography,IconButton,useTheme } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import Friend from '../../components/Friend'
const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
        }) => {
          const {palattle} = useTheme();
          return (
          <WidgetWrapper>
           <Friend/>

          </WidgetWrapper>
          )
        }

export default PostWidget