import React,{Suspense, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getReservationUser} from '../features/reservation/reservationSlice'
import Order from '../components/user/Order'
import UserDetails from '../components/user/UserDetails'

const UserProfil = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth);
  const {reservation} = useSelector(state => state.reservation)
  const {userReservation} = reservation;

  useEffect(() => {
      dispatch(getReservationUser())
  }, [dispatch])

  return (
    <div>
      {(userReservation) ? (
        <div>
          <Order reservation={userReservation}/>
          <UserDetails user={user}/>
        </div>
      ) : (
        <div>Loading...</div>  
      )
      }

    </div>
  )
}

export default UserProfil