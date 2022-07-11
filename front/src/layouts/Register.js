import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {register} from '../features/auth/authSlice'
import { NavLink } from 'react-router-dom'
import { TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {user,error} = useSelector(state => state.auth)
  const [formData,setFormData] = useState({
    firstname:'',
    lastname:'',
    password:'',
    passwordconf:'',
    email:'',
    dob:'',
    phone:''
  })
  const {firstname,lastname,password,passwordconf,email,dob,phone} = formData;
  
  useEffect(() => {
    if(error && !user){
      console.log("User not registered !")
    }
    if(user){
      navigate('/')
      console.log("user registered !")
    }
  },[error,user,navigate])
  
  const onSubmit = (e) =>{
    e.preventDefault();

    // checking if password match 
    if(password !== passwordconf){
      alert("Password don't match")
    }else{
      const user = {
        firstname,
        lastname,
        password,
        email,
        dob,
        phone
      }
      dispatch(register(user))
    }
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  return (
    <>
      <section className='form-container'>
        <h1>Register</h1>
        <span>Please Register or <NavLink to='/login' >loggin</NavLink> </span>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <TextField label="firstname" variant="outlined" type="text" name="firstname" value={firstname} onChange={handleChange}/>
          </div>
          <div className='form-group'>
            <TextField label="lastname" variant="outlined" type="text" name="lastname" value={lastname} onChange={handleChange}/>
          </div>
          <div className='form-group'>
            <TextField label="password" variant="outlined" type="password" name="password" value={password} onChange={handleChange}/>
          </div>
          <div className='form-group'>
            <TextField label="password" variant="outlined" type="password" name="passwordconf" value={passwordconf} onChange={handleChange}/>
          </div>
          <div className='form-group'>
            <TextField label="email" variant="outlined" type="email" name="email" value={email} onChange={handleChange}/>
          </div>
          <div className='form-group'>
            <TextField  variant="outlined" type="date" name="dob" value={dob} onChange={handleChange}/>
          </div>
          <div className='form-group'>
            <TextField label="phone" variant="outlined" type="phone" name="phone" value={phone} onChange={handleChange}/>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Register</button>
          </div>

        </form>
      </section>
    </>
  )
}

export default Register