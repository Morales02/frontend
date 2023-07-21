import React, {useState}from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

export default function CreateProduct({load,setLoad}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Crear Productos
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
       <Formik
       initialValues={{ 
        nameProducts:  '',
        priceProducts: '',
        quantityProducts: '',

      }}
        validationSchema ={ Yup.object({
          nameProducts: Yup.string()
            .max(15, 'Nombre Requerido')
            .required('Required'),
          priceProducts: Yup.string()
            .max(10, 'INGRESAR PRECIO DEL PRODUCTO')
            .required('Required'),
            quantityProducts: Yup.string()
            .max(8, 'INGRESAR PRECIO DEL PRODUCTO')
            .required('Required'),
        })}
       onSubmit={async(values, { setSubmitting }) => {  
         const response = await axios.post(`http://localhost:5000/products/saveProducts`,values);
        console.log(response);  
        setLoad(!load);
        setOpen(false);
      }}
       >

       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (

        <form onSubmit={handleSubmit}>
           
            <DialogTitle id="alert-dialog-title">
            {"Crear Nuevo Usuario"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
      

            <input type='file'
                 
                 id="outlined-basic" 
                 name='photo' 
                 variant="outlined" 
                 onChange={handleChange}
                 value= {values.saveUserJpg}
                 error= {errors.saveUserJpg}
                 helperText={errors.saveUserJpg}
                />
                
            <TextField 
                sx={{mt:3}}
                fullWidth
                id="outlined-basic" 
                name='nameProducts'
                label="Nombre" 
                variant="outlined" 
                onChange={handleChange}
                value= {values.nameProducts}
                error= {errors.nameProducts}
                helperText={errors.nameProducts}
                />

                <TextField 
                sx={{mt:3}}
                type='number'
                fullWidth
                id="outlined-basic" 
                name='priceProducts'
                label="Precio Del Producto"
                variant="outlined"
                onChange={handleChange}
                value={values.priceProducts}
                error={errors.priceProducts}
                helperText={errors.priceProducts}
                 /> 

                <TextField 
                sx={{mt:3}}
                type='number'
                fullWidth
                id="outlined-basic" 
                name='quantityProducts'
                label="Cantidad De Productos"
                variant="outlined"
                onChange={handleChange}
                value={values.quantityProducts}
                error={errors.quantityProducts}
                helperText={errors.quantityProducts}
                 /> 
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button type='submit'>
                Crear     
            </Button>
            </DialogActions>
        </form>
         )}
         </Formik>
      </Dialog>
    </div>
  );
}