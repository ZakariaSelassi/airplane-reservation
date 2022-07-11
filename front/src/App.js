import React, { Suspense } from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import { lazy } from 'react'
import {useSelector} from 'react-redux'
import jwt_decode from "jwt-decode";

const Navbar = lazy(() => import('./components/Navbar'))
const FlightList = lazy(() => import('./layouts/FlightList'))
const FlightDetails = lazy(() => import('./layouts/FlightDetails'))
const Login = lazy(() => import('./layouts/Login'))
const Register = lazy(() => import('./layouts/Register'))
const UserProfil = lazy(() => import('./layouts/UserProfil'))
/**
 * @Descriptions : 
 *  - Get the user from store
 *  - check if there is user, if not redirect to Login 
 *  - need to get expireTime of the token with jwt_decode
 *  - calculate expirationTime 
 *  - check if isExpired remove it else load component
 */

const AuthProvider = ({children}) => {
  const {user} = useSelector(state => state.auth);
  if(!user){
    return <Navigate to='/login'/>
  }
  const decodedToken = jwt_decode(user.token);
  const isExpired = decodedToken.exp < Date.now() / 1000;
  if(isExpired){
    localStorage.removeItem('token')
    window.location.reload()
  }

  return user ? children : <Navigate to='/login' />
}

const App = () => {
  
  return (
    <div className='main'>
      <Navbar/>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={
            <AuthProvider>
              <FlightList/>
            </AuthProvider>
          } />
          <Route path='/flight' element={
            <AuthProvider>
              <FlightList/>
            </AuthProvider>
          } />

          <Route path='/flight/:id' element={
          <AuthProvider>
              <FlightDetails/>
          </AuthProvider> 
          }/>

          <Route path='/profil' element={
            <AuthProvider>
              <UserProfil/>
            </AuthProvider>
          }/>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Suspense>   
    </div>
  )
}

export default App