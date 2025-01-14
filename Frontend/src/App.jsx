import React from 'react'
import Navbar from './components/NavBar/Navbar'
import {Route,Routes} from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'

const App = () => {
  return (
    <div className='app'>
   <Navbar />
      <Routes>
       <Route path ='/' element={<Home/>}/>
       <Route path ='/Cart' element ={<Cart/>}/>
       <Route path ='/Order' element ={<PlaceOrder/>}/>
      </Routes>
    </div>
  )
}

export default App
