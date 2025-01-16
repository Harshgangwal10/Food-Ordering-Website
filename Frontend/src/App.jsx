import React, { useState } from 'react'
import Navbar from './components/NavBar/Navbar'
import {Route,Routes, useSearchParams} from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'

const App = () => {
  const [showLogin,setShowLogin]= useState(false);
  return (
    <>
    {showLogin ? <Login  setShowLogin={setShowLogin} />:<></>}
 <div className='app'>
   <Navbar setShowLogin ={setShowLogin} />
      <Routes>
       <Route path ='/' element={<Home/>}/>
       <Route path ='/Cart' element ={<Cart/>}/>
       <Route path ='/Order' element ={<PlaceOrder/>}/>
      </Routes>
    </div>
    <Footer/>

    </>
    
  )
}

export default App
