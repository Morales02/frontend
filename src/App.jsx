import { BrowserRouter , Routes, Route} from 'react-router-dom'
import ResponsiveAppBar from './components/molecules/ResponsiveAppBar/ResponsiveAppBar'
import Home from '@pages/home/index'
import Users from '@pages/users'
import Products from '@pages/products'
import Cotizacion from './components/molecules/ResponsiveAppBar/Cotizacion/Cotizacion'



function App() {

  return (
    <BrowserRouter initialEntries={['/inbox']} initialIndex={0}>
        <ResponsiveAppBar  /> {/* importamos navbar  */}
      <Routes>
         <Route path='/' element={ <Home/>} />  {/* esto es para la creacion de la ruta */}
         <Route path='/usuarios' element={<Users/>} />
         <Route path='/productos' element={<Products/>} />
         <Route path='/Cotizacion' element={<Cotizacion/>} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
