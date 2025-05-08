import React from 'react'
import NavBar from './navbar'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

const Layout = () => {
  return (
    <>
    <NavBar/>
    <Box paddingTop='70px'>
      <Outlet/>

    </Box>
    </>
  )
}

export default Layout