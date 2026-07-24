import { useEffect, useState } from 'react'
import Navbar from './components/NavBar/Navbar'
import {Route,Routes, useLocation} from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import Verify from './pages/verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'


const App = () => {
  const [showLogin,setShowLogin]= useState(false);
  return (
    <>
    {showLogin ? <Login  setShowLogin={setShowLogin} />:<></>}
  <div className='app'>
   <ScrollToSection />
   <Navbar setShowLogin ={setShowLogin} />
      <Routes>
       <Route path ='/' element={<Home/>}/>
       <Route path ='/Cart' element ={<Cart/>}/>
       <Route path ='/order' element ={<PlaceOrder/>}/>
       <Route path ='/verify' element ={<Verify/>}/>
       <Route path ="/myorders" element ={<MyOrders/>}/>
      </Routes>
     
    </div>
    <Footer/>

    </>
    
  )
}

const ScrollToSection = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const section = document.querySelector(hash);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  return null;
};

export default App
