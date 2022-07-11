import React, { useEffect ,useCallback, useState, Suspense} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Details from '../components/explorer/Details'
import {fetchSingle} from '../features/flight/flightSlice'
const FlightDetails = () => {   

  const dispatch = useDispatch()
  const {id} = useParams()
  const {loading,flight} = useSelector(state => state.flight);
  const {currentFlight,airplane,flightPrice} = flight


  useEffect(() => {
    return () => {
      dispatch(fetchSingle(id)).then(res => console.log(res))

    }
  },[dispatch,id])
  if(loading || !currentFlight ){
    return <div>Loading...</div>
  }
  return (
    <>
     <Suspense fallback={<div>Loading...</div>}>
        <Details dataFlight={flight} nameAirplane={airplane} price={flightPrice}/>
     </Suspense> 
    </>
  )
}

export default FlightDetails