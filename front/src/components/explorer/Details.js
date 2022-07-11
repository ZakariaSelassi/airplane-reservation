import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {addReservation} from '../../features/reservation/reservationSlice'
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Details = ({dataFlight}) => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const navigate = useNavigate();
  const confirmReservation = async () => {
    dispatch(addReservation(id))
    navigate('/')
  }
  return (
    <div className='details-main'>
        <div className='details-content'>
             <h2>Booking details :</h2>  
             <p>Reference : {dataFlight.currentFlight.name}</p>
             <p>Company name : {dataFlight.companyName.toUpperCase()}</p>
             <p>From : {dataFlight.currentFlight.from}</p>
             <p>To : {dataFlight.currentFlight.to.toUpperCase()}</p>
             <p>Departur : {new Date(dataFlight.currentFlight.departurDate).toLocaleDateString('fr-Fr')} at {dataFlight.currentFlight.departurTime}</p>
             <p>Price : {dataFlight.flightPrice} $</p>
              <div style={{width:'50%',display:'flex',justifyContent:'space-between'}}>
                <button className='btn-details' onClick={confirmReservation}>Add to your order</button>
                <button className='btn-details cancel'>Back</button>
            </div>
        </div>
    </div>
  )
}

export default Details