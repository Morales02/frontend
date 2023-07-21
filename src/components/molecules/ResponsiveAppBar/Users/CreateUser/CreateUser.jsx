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


export default function CreateUser({load,setLoad}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveUserJpg = async () => {
    const response = await axios.get(`http://localhost:5000/users/saveUsers/uploads`)
    setFormData(response.data.user);
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Crear Usuario
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       <Formik
       initialValues={{ 
        photo:  '',
        name: '',
        email: '',
        password: '',
        age: '',
        idRol: '',
      }}
        validationSchema ={ Yup.object({
          name: Yup.string()
            .max(15, 'Campo Obligatorio')
            .required('Required'),
          password: Yup.string()
            .max(8, 'La Contraseña es Minimo 8 Caracteres')
            .required('Required'),
          age: Yup.string()
            .max(2, 'Cantidad Maxima de Digitos es: 2 ')
            .required('Required'),
          email: Yup.string()
          .email('Campo Obligatorio').required('Required'),
        })}

       onSubmit={async(values, { setSubmitting }) => { 
        
         const response = await axios.post(`http://localhost:5000/users/saveUsers`,values); 
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

                <TextField 
                sx={{mt:3}}
                fullWidth
                id="outlined-basic" 
                name='name'
                label="Nombre" 
                variant="outlined" 
                onChange={handleChange}
                value= {values.name}
                error= {errors.name}
                helperText={errors.name}
                />

                <TextField 
                fullWidth
                sx={{mt:3}}
                id="outlined-basic" 
                name='email'
                label="Email"
                variant="outlined"
                onChange={handleChange}
                value={values.email}
                error={errors.email}
                helperText={errors.email}
                 />

                <TextField 
                fullWidth
                sx={{mt:3}}
                id="outlined-basic" 
                name='password'
                label="Contraseña"
                variant="outlined"
                onChange={handleChange}
                value={values.password}
                error={errors.password}
                helperText={errors.password}
                 /> 

                <TextField 
                sx={{mt:3}}
                type='number'
                fullWidth
                id="outlined-basic" 
                name='age'
                label="Edad"
                variant="outlined"
                onChange={handleChange}
                value={values.age}
                error={errors.age}
                helperText={errors.age}
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