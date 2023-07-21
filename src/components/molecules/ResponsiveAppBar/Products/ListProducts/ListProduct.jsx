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
import { Button , IconButton } from '@mui/material';
import { Delete} from '@mui/icons-material';
import Swal from 'sweetalert2';


export default function ListProduct ({ load,setLoad}) {
    const [rows, setRows] = useState ([]);

    useEffect (() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:5000/products/consulProducts');
            console.log(response.data.products);
            setRows(response.data.products);
        }
    fetchData();
            //podemos hacer un disparador para agregar datos cuando guarde otro
    },[load]) 
    // recivimos de un parametro insertamos de esta forma
    
    const handleDeleteProduct =  (id) => {
      Swal.fire({
        title: '¿CONFIRMA ELIMINAR PRODUCTO?',
        html: "<i> Si Esta Seguro de ELIMINAR el Producto: <strong>"+id.nameProducts+"</strong></i>",
        icon: 'warning',
        iconColor:'red',
        confirmButtonText: 'Si',
        confirmButtonColor: 'red',
        showCancelButton: true,
        cancelButtonText: "No",
        cancelButtonColor: 'blue'
      }).then((res) => {
        if (res.isConfirmed) {
           axios.delete(`http://localhost:5000/products/deleteProducts/${id.id}`)
          setLoad(!load);
          Swal.fire({
            text: 'Producto Eliminado con exito',
            icon: 'success',
            timer:  3000,
          });    
        } else if (res.isDismissed) {
          Swal.fire({
            title: 'Opss!',
            html: "<i> El Producto: <strong>"+id.nameProducts+"</strong> No Fue Eliminado</i>",
            icon: 'error',
            timer:  3000,
          }); 
        }
      });
     }
     
    
    return (
        <>

         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Foto</TableCell>
            <TableCell >Nombre Producto</TableCell>
            <TableCell >Precio</TableCell>
            <TableCell >Cantidad De Producto</TableCell>
            <TableCell >Acciones</TableCell>
            <TableCell >Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img width={100} src={`http://localhost:5000/uploads/${row}`}></img>               
              </TableCell>
              <TableCell >{row.nameProducts}</TableCell>
              <TableCell >{row.priceProducts}</TableCell>
              <TableCell >{row.quantityProducts}</TableCell>     
              <TableCell >

                      <IconButton color="info" aria-label="Editar" >
                          <Edit/>
                      </IconButton>  

                        <IconButton  color="warning" aria-label="Eliminar"  onClick={() => {handleDeleteProduct(row)}}>        
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
    </TableContainer>

        </>
    )}