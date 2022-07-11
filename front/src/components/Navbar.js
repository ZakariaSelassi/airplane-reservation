import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import {logout} from '../features/auth/authSlice'
const Navbar = () => {
  const {user} = useSelector(state => state.auth)

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <Box >
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <NavLink to='/' className="navbar-link" >Booking App</NavLink>
        </Typography>
        {
          user && (<NavLink to="/profil" className="navbar-link">Profil</NavLink>)
        }
        {
          user ? <NavLink to='/' className="navbar-link" onClick={handleLogout}>Logout</NavLink> : <NavLink to='/login' className="navbar-link">Login</NavLink>
        }
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Navbar