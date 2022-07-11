import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {deleteUserReservation,getReservationUser} from '../../features/reservation/reservationSlice'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
const Order = ({reservation}) => {
 
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deleteUserReservation(id)).then(() => {
      dispatch(getReservationUser())
    })
  }
  return (
    <div style={{padding:'1rem'}}>
        <h4>Order :</h4>
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
            <TableCell>Ref</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {
                    reservation.map(item => (
                        <TableRow key={item._id}>
                            <TableCell>{item._id}</TableCell>
                            <TableCell>{item.date_of_reservation}</TableCell>
                            <TableCell>
                                <button>Payement</button>
                                <button onClick={() => handleDelete(item._id)}>Cancel</button>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
            </Table>
    </TableContainer>
    </div>
  )
}

export default Order