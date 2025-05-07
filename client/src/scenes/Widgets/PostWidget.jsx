import React, { useState } from 'react'
import WidgetWrapper from '../../components/WidgetWrapper'
import { Box,Typography,IconButton,useTheme, Dialog, DialogContent, DialogActions } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import Friend from '../../components/Friend'
import { setPost } from '../../state'
import { useDispatch, useSelector } from 'react-redux'
import { FavoriteOutlined ,ShareOutlined,ChatBubbleOutline,FavoriteBorderOutlined,} from '@mui/icons-material'
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
          const [isComment,setIsComment] = useState(false);
          const [isModal,setIsModal] = useState(false);
          const [imageUrl,setImageUrl] = useState('');
          const dispatch = useDispatch();
          const token = useSelector((state)=>state.token);
          const loginUserId = useSelector((state)=>state.user._id);
          const isLiked = Boolean(likes[loginUserId])
          const likeCount = Object.keys(likes).length
          const countComment = comments.length

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
                body : JSON.stringify({userId : loginUserId})
              })
              const data = await response.json();
              dispatch(setPost({post : data}))
             
            }

            const handleImageClick = (imageUrl) => {
              setImageUrl(imageUrl);
              setIsModal(true);
              console.log('YOu click the button')
           }

            const handleCloseModal = () => {
              setIsModal(false);
              setImageUrl('')

            }


          return (
            <WidgetWrapper mb='1rem'>
              <Friend friendId = {postUserId} name={name} subtitle={location} userPicturePath={userPicturePath}/>
              
              <Typography color={main} m='2rem 0'>
                {description}
              </Typography>
              {picturePath && (
                <img
                  width='100%'
                  height='auto'
                  alt='post'
                  style={{
                    borderRadius:'0.5rem',
                    cursor : 'pointer'
                  }}
                  src={`http://localhost:3000/assets/${picturePath}`}
                  onClick={()=>handleImageClick(`http://localhost:3000/assets/${picturePath}`)}
                />
              )}
              <FlexBetween   mt="0.25rem">
                <FlexBetween gap='1rem'>
                  <FlexBetween gap='0.3rem'>
                    <IconButton onClick={patchLike}>
                    {
                      isLiked ? (
                        <FavoriteOutlined/>
                      )
                      :
                      (
                        <FavoriteBorderOutlined/>
                      )
                    }
                    </IconButton>
                    <Typography>{likeCount=== 0 ? '' : likeCount}</Typography>
                  </FlexBetween>
                  <FlexBetween gap='0.3rem'>
                    <IconButton onClick={()=>setIsComment(!isComment)}>
                        <ChatBubbleOutline/>  
                    </IconButton>
                    <Typography>{countComment === 0 ? '' : countComment}</Typography>
                  </FlexBetween>
                </FlexBetween>
                <ShareOutlined/>
              </FlexBetween>
              {isComment && (
                  <Box mt="0.5rem">
                    {comments?.map((comment, i) => (
                      <Box key={`${name}-${i}`}>
                        
                        <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                          {comment} 
                        </Typography>
                      </Box>
                    ))}
                    
                  </Box>
                )}

              {/* Image Modal*/}
              {/* Image Modal */}
      <Dialog open={isModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        {/* Dialog Content (Image) */}
        <DialogContent sx={{ p: 0, backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
          <Box
            component="img"
            src={imageUrl}
            alt="Post image"
            sx={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              
            }}
          />
        </DialogContent>
      </Dialog>

         </WidgetWrapper>
         
            )}

export default PostWidget