import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
const UserDetails = ({user}) => {
  return (
        <div style={{padding:'1rem'}}>
        <h4>User info :</h4>
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
            <TableCell>FirstName</TableCell>
            <TableCell>LastName</TableCell>
            <TableCell>Phone</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
             <TableCell>{user.firstname}</TableCell>
             <TableCell>{user.lastname}</TableCell>
             <TableCell>{user.phone}</TableCell>
             </TableRow>       
            </TableBody>
            </Table>
    </TableContainer>
    </div>
  
  )
}

export default UserDetails