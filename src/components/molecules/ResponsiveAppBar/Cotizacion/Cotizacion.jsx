import { Form, Formik } from "formik"
import Container from '@mui/material/Container';
import 'bootstrap/dist/css/bootstrap.css';
import { TextField } from "@mui/material";
import axios from "axios";


export default function Cotizacion() {
   
    return(
        <div >
        <Container maxWidth="xs" >
        <Formik  
        aling= 'center'
        initialValues={{
            description:  "",
            cantidadProductos: "",
            precio: "",
        }}
        onSubmit={async(values,action) => { 
            const response = await axios.get(`http://localhost:5000/products/consulProducts`,values);
            console.log(response)
        }}
        
        >
           {({handleChange, handleSubmit}) => (
        <Form onSubmit={handleSubmit}>

        <TextField 
            sx={{mt:2}}
            fullWidth
            id="outlined-basic" 
            name='nombreProductos'
            label="Selecionar Productos" 
            variant="outlined" 
            onChange={handleChange}
        />

        <TextField 
            sx={{mt:2}}
            fullWidth
            type="number"
            id="outlined-basic" 
            name='cantidadProductos'
            label="Cantidad De Productos" 
            variant="outlined" 
            onChange={handleChange}
        />
        
        <TextField 
            sx={{mt:2}}
            fullWidth
            id="outlined-basic" 
            type="number"
            name='precio'
            label="Precio Del Producto" 
            variant="outlined" 
            onChange={handleChange}
        />

        <TextField 
            sx={{mt:2}}
            fullWidth
            id="outlined-basic" 
            name='idCustomers'
            label="Cliente Cotizante" 
            variant="outlined" 
            onChange={handleChange}
        />
        <TextField 
            sx={{mt:2}}
            fullWidth
            id="outlined-basic" 
            name='idUsers'
            label="Usuario Vendedor" 
            variant="outlined" 
            onChange={handleChange}
        />
             <button 
             type="submit"
             className="btn btn-success"
             >Cotizar</button> 
         </Form>
           )}
        </Formik>
        </Container>
        </div>
    )
}