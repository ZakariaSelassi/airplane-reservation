import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import { NavLink } from 'react-router-dom';
import Modal from './Modal'


const Flights = ({flight}) => {

  const [open,setOpen] = useState(false)
  const [flightId,setFlightId] = useState(null)

  /**
   *  @Description : open/close the modal  
  **/
  const handleClickToOpen = () => {
    setOpen(true);
  }
  const handleClickToClose = () => {
    setOpen(false)
  }
  const handleFlightById = (id) => {
    setFlightId(id)
  }
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ref</TableCell>
            <TableCell align="right">Airline</TableCell>
            <TableCell align="right">From</TableCell>
            <TableCell align="right">to</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Economy</TableCell>
            <TableCell align="right">Business</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {
          
          flight.map(item => (
            <TableRow
              key={item._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{item.airplane}</TableCell>
              <TableCell align="right">{item.from.toUpperCase()}</TableCell>
              <TableCell align="right">{item.to.toUpperCase()}</TableCell>
              <TableCell align="right">{ new Date( item.departurDate).toLocaleDateString('fr-FR')}</TableCell>
              <TableCell align="right">{item.departurTime}</TableCell>
              <TableCell align="right">{item.maxEconomy}</TableCell>
              <TableCell align="right">{item.maxBusiness}</TableCell>
              <TableCell align="right">
                <NavLink to={`/`}>
                  <button className='btn btn-block booking' onClick={ () => {handleClickToOpen();handleFlightById(item._id);} }>Booking</button>
                </NavLink>
              </TableCell>

            </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Modal handleOpen={handleClickToOpen} handleClose={handleClickToClose} open={open} flightId={flightId}/>   
    </>
  )
}

export default Flights