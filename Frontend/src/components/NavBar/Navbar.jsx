import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from "../../Context/storeContext";

const navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("Home");
  const {getTotalCartAmount,token,setToken} =useContext(StoreContext);
  const navigate =useNavigate()

  const Logout =() =>{
    localStorage.removeItem("token");
    setToken("")
    navigate("/")
  }
 

 

  return (
    <div className= "navbar">
     
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("Menu")} className={menu === "Menu" ?"active":""}>Menu</a>
        <a href='#app-download' onClick={()=>setMenu("Mobile-App")} className={menu === "Mobile-App" ?"active":""}>Mobile-App</a>
        <a href='#footer' onClick={()=>setMenu("Contact Us")} className={menu === "Contact Us" ?"active" :""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='./cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount()===0 ? "" :"dot" }></div>
        </div>
       {!token? <button onClick={()=>setShowLogin(true)}>Sign in</button>
       :<div className="navbar-profile">
        <img src={assets.profile_icon} alt="" />
        <ul className="nav-profile-dropdown">
          <li><img src={assets.bag_icon} alt="" />Orders</li>
          <hr />
          <li onClick={Logout}><img src={assets.logout_icon} alt="" />Logout</li>
        </ul>


       </div>

  }
      </div>
    </div>
  );
};

export default navbar;
