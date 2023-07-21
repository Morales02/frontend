/* import  React, {useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'; */
/* import Paper from '@mui/material/Paper'; */
import Container from '@mui/material/Container';
/* import axios from 'axios'; */
import CreateUser from '@components/molecules/ResponsiveAppBar/Users/CreateUser/CreateUser';
import ListUsers from '../../components/molecules/ResponsiveAppBar/Users/ListUser/ListUser';
import EditUser from '../../components/molecules/ResponsiveAppBar/Users/EditUser/EditUser';
import { useState } from 'react';

export default function Users () {
    const [load, setLoad] =useState(false);
    const [idUpdate, setIdUpdate] = useState('');

  return (
    <Container maxWidth="lg" sx={{mt: 5  }} >

      <CreateUser load={load} setLoad={setLoad} />
      <ListUsers load={load} setLoad={setLoad}  setIdUpdate={setIdUpdate} /> 
      <EditUser idUpdate={idUpdate} load={load} setLoad={setLoad}/>
  </Container>
  );
}