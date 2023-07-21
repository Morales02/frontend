import React, {useState,useEffect }from 'react';
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


export default function EditUser ({idUpdate,load,setLoad }) {

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const consultUserById = async (id) => {
    const response = await axios.get(`http://localhost:5000/users/consulUser/3`);
    console.log(response.data.user);
    setFormData(response.data.user);
  }

  useEffect(() => {
      if (idUpdate) {
        consultUserById(idUpdate);
      }
      setOpen(idUpdate ? true : false);
  }, [idUpdate])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       <Formik
       initialValues={{ 
        id: idUpdate,
        name: formData , 
        email: formData ,
        age: formData , 
    }}
        validationSchema ={ Yup.object({
          name: Yup.string()
            .required('Este campo es obligario'),
          email: Yup.string().email('Dirección de email invalida').required('Este campo es obligario'),
          age: Yup.number()
            .required('Este campo es obligario')
        })}
       onSubmit={async(values, { setSubmitting }) => { 
        
         const response = await axios.put(`http://localhost:5000/users/updateUsers`,values);  
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
            {"Actualizar Usuario"}
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
                Aztualizar
            </Button>
            </DialogActions>
        </form>
         )}
         </Formik>
      </Dialog>
    </div>
  );
}