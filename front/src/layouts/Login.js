import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector} from 'react-redux'
import {login} from '../features/auth/authSlice'

import { TextField } from '@mui/material'

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user,error,loading} = useSelector(state => state.auth)

  const [formData,setFormData] = useState({
    email:'',
    password:'',
  })
  const {email,password} = formData
  useEffect(() => {
    if(error && !user){
      console.log("not loggedin")
    }
    if(user){
      navigate('/')
    }
  },[user,navigate])

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    }
    dispatch(login(user))
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  if(loading){
    return <div>Loading ...</div>
  }
  return (
    <>
      <section className='form-container'>
        <h1>Login</h1>
        <span>Please login or <NavLink to="/register">Register</NavLink> </span>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <TextField label="email" variant="outlined" type="email" name="email" value={email} onChange={handleChange}/>
          </div>
          <div className='form-group'>
            <TextField label="password" variant="outlined" type="password" name="password" value={password} onChange={handleChange}/>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Login</button>
          </div>

        </form>
      </section>
    </>
  )
}

export default Login