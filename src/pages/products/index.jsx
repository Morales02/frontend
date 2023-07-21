/* import axios from 'axios'; */
import { useState } from 'react';
import Container from '@mui/material/Container';
import CreateProducts from '../../components/molecules/ResponsiveAppBar/Products/CreateProduct/CreateProduct';
import ListProducts from '../../components/molecules/ResponsiveAppBar/Products/ListProducts/ListProduct';

export default function Products () {
    const [load, setLoad] =useState(false);


  return (
    <Container maxWidth="lg" sx={{mt: 5  }} >

      <CreateProducts load={load} setLoad={setLoad} />
      <ListProducts load={load} setLoad={setLoad} />  

  </Container>
  );
}