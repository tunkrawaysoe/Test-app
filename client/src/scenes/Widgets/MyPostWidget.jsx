import React, { useState } from 'react';
import WidgetWrapper from '../../components/WidgetWrapper';
import FlexBetween from '../../components/FlexBetween';
import UserImage from '../../components/UserImage';
import Dropzone from 'react-dropzone';
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  Snackbar,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../state';
import { useNavigate } from 'react-router-dom'; // Ensure this is imported

const MyPostWidget = ({ picturePath, userId }) => {
  const navigate = useNavigate(); // This should be defined here
  const [post, setPost] = useState('');
  const [image, setImage] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const createPost = async () => {
    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('description', post);
      if (image) {
        formData.append('picture', image);
        formData.append('picturePath', image.name);
      }

      const response = await fetch(`http://localhost:3000/posts`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to create post');

      const data = await response.json();
      dispatch(setPosts({ posts: data }));
      setImage(null);
      setPost('');
      setErrorMessage(''); // Clear any previous error on successful post creation
    } catch (error) {
      setErrorMessage(error.message || 'Post creation error.');
    }
  };

  return (
    <WidgetWrapper mb='2rem'>
      {/* Snackbar for errors */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage('')} // Close Snackbar after it disappears
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>

      <FlexBetween gap="1.5rem">
        {/* Only navigate when image is clicked */}

        <Box onClick={() => navigate(`/profile/${userId}`)} 
          sx={{
            "&:hover": {
              color: palette.primary.light,
              cursor: "pointer",
            },
          }}>
        <UserImage
          image={picturePath}
           // Navigate to the user's profile
        />
        </Box>
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: '100%',
            backgroundColor: palette.neutral.light,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
        />
      </FlexBetween>

      {isImage && (
        <Box border={`1px solid ${medium}`} borderRadius="5px" mt="1rem" p="1rem">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ '&:hover': { cursor: 'pointer' } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton onClick={() => setImage(null)} sx={{ width: '15%' }}>
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: '1.25rem 0' }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography color={mediumMain}>Image</Typography>
        </FlexBetween>

        {isNonMobileScreens && (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        )}

        <Button
          disabled={!post}
          onClick={createPost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: '1rem',
            fontSize: '0.9rem',
            fontWeight: 600,
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
