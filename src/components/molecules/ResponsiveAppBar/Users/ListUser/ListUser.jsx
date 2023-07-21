import React, {useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Edit from '@mui/icons-material/EditNote';
import { Button,IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { Pagination } from 'react-bootstrap';


export default function ListUsers ({load,setLoad, setIdUpdate}) {
    const [rows, setRows] = useState ([]);
    
    useEffect (() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:5000/users/consulUsers');
            console.log(response.data.users);
            setRows(response.data.users);
        }
        fetchData();
            //podemos hacer un disparador para agregar datos cuando guarde otro
    },[load]) 

    // recivimos de un parametro insertamos de esta forma
    const handleDeleteUser =  (id) => {
      Swal.fire({
        title: '¿CONFIRMA ELIMINAR USUARIO?',
        html: "<i> Esta Seguro de ELIMINAR el usuario: <strong>"+id.name+"</strong></i>",
        icon: 'warning',
        iconColor:'red',
        confirmButtonText: 'Si',
        confirmButtonColor: 'red',
        showCancelButton: true,
        cancelButtonText: "No",
        cancelButtonColor: 'blue'
      }).then((res) => {
        if (res.isConfirmed) {
          axios.delete(`http://localhost:5000/users/deleteUsers/${id.id}`)
          setLoad(!load);
          Swal.fire({
            text: 'Usuario Eliminado con exito',
            icon: 'success',
            timer:  3000,
          });    
        } else if (res.isDismissed) {
          Swal.fire({
            title: 'Opss!',
            html: "<i> El usuario: <strong>"+id.name+"</strong> No Fue Eliminado</i>",
            icon: 'error',
            iconColor: 'red',
            timer:  3000,
          }); 
        }
      });
     }
    
     const handleUpdate = async (id) => {
      setIdUpdate(id);
  }
  
    return (
        <>

         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Foto</TableCell>
            <TableCell >Nombres</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Rol</TableCell>
            <TableCell >Acciones</TableCell>
            <TableCell >Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              
              <TableCell component="th" scope="row">
                {/* <img width={100} src={`http://localhost:5000/uploads/${row.photo}`}></img>  */}              
              </TableCell>
              <TableCell >{row.name}</TableCell>
              <TableCell >{row.email}</TableCell>
              <TableCell >{row.role.description}</TableCell>     
              <TableCell >                      
                        <IconButton color="info" aria-label="Editar" onClick={() => {handleUpdate(row)}}  >
                          <Edit/>
                        </IconButton> 
                          {/* BOTON CON VENTADA DE ALERTA  */}
                        <IconButton color="warning" aria-label="Eliminar"  onClick={() => {handleDeleteUser (row)}}> 
                          <Delete/>
                        </IconButton>           

              </TableCell>

              <TableCell>
              <Button >ACTIVO</Button>
              </TableCell>       
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination/>
    </TableContainer>
        
        </>
    )
}