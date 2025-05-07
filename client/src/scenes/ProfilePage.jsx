import React, { use, useEffect, useState } from 'react'
import WidgetWrapper from '../components/WidgetWrapper'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/material'
import NavBar from '../navbar'
import FriendListWidget from './Widgets/FriendListWidget'
import UserWidget from './Widgets/UserWidget'
import PostsWidget from './Widgets/PostsWidget'
import MyPostWidget from './Widgets/MyPostWidget'


const ProfilePage = () => {
  const [user,setUser] = useState(null)
  const token = useSelector((state)=>state.token)
  const loginUserId= useSelector((state)=>state.user._id)
  const dispatch = useDispatch();
  const {userId} = useParams();
  const isUserProfile = loginUserId === userId
  const {picturePath} = useSelector((state)=>state.user)
  
  

  
  const getUser = async () => {
    const response = await fetch(`http://localhost:3000/users/${userId}`,{
      method : "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data)
}

    useEffect(()=>{
      getUser();
    },[])
  
    return (
      <Box>
        <NavBar />
        <Box display='flex' p='2rem 5%' gap='1rem'>
          <Box flexBasis='30%'>
            {user && (
              <>
                <UserWidget userId={userId} picturePath={user.picturePath} />
                <FriendListWidget userId={userId} />
              </>
            )}
          </Box>
          <Box flexBasis='50%'>
            {
              isUserProfile && (
                <MyPostWidget userId={loginUserId} picturePath={picturePath}/>
              )
            }
           <PostsWidget userId={userId} isProfile/>
          </Box>
        </Box>
      </Box>
    )
    
}

export default ProfilePage