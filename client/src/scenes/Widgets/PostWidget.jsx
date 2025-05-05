import React from 'react'
import WidgetWrapper from '../../components/WidgetWrapper'
import { Box,Divider,Typography,IconButton,useTheme } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import Friend from '../../components/Friend'
import { setPost } from '../../state'
import { useDispatch, useSelector } from 'react-redux'
import { FavoriteOutlined ,ShareOutlined,ChatBubbleOutline} from '@mui/icons-material'
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
            const { palette } = useTheme();
            const main = palette.neutral.main;
            const primary = palette.primary.main;


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
              <Friend friendId = {postUserId} name={name} location={location}/>
              <Typography color={main} sx={{mt:"1rem"}}>
                {description}
              </Typography>
              {picturePath && (
                <img
                  width='100%'
                  height='auto'
                  alt='post'
                  style={{
                    borderRadius:'0.5rem',                    
                  }}
                  src={`http://localhost:3000/assets/${picturePath}`}
                />
              )}
              <FlexBetween   mt="0.25rem">
                <FlexBetween gap='1rem'>
                  <FlexBetween gap='0.3rem'>
                    <FavoriteOutlined/>
                    <Typography>2</Typography>
                  </FlexBetween>
                  <FlexBetween gap='0.3rem'>
                    <ChatBubbleOutline/>
                    <Typography>2</Typography>
                  </FlexBetween>
                </FlexBetween>
                <ShareOutlined/>

                
              </FlexBetween>
            

            </WidgetWrapper>
            )
          }

export default PostWidget