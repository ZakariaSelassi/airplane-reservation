import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';

const Modal = ({handleClose,open,flightId}) => {
  
  const navigate = useNavigate()
  const handleAgree = () => {
    // fetch single flight by id and redirect to flight detail page
    //dispatch(fetchFlightId(flightId))
    navigate(`/flight/${flightId}`)
  }

  return (
    <>
    <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Do you want to book this flight ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please confirme the flight. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={() => {handleClose(); handleAgree(); }}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Modal