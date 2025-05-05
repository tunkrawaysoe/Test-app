import React from 'react'
import WidgetWrapper from '../../components/WidgetWrapper'
import { Box,Divider,Typography,IconButton,useTheme } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import Friend from '../../components/Friend'
import { setPost } from '../../state'
import { useDispatch, useSelector } from 'react-redux'
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
            const dispatch = useDispatch();
            const loggedInUserId = useSelector((state) => state.user?._id);
            const token = useSelector((state)=>state.token)

              const patchLike = async () => {
                const response = await fetch(`http://localhost:3000/posts/${postId}/like`,{
                  method : 'PATCH',
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  body : JSON.stringify({userId : loggedInUserId})
                });
                const updatedPost = await response.json();
                dispatch(setPost({ post: updatedPost }));

            }

            return (
            <WidgetWrapper>
            <Friend/>

            </WidgetWrapper>
            )
          }

export default PostWidget