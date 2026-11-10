import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { selectTotalCartAmount, setToken } from "../../store/store";

const navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("Home");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.shop.token);
  const totalCartAmount = useSelector(selectTotalCartAmount);
  const navigate =useNavigate()
  const location = useLocation()

  useEffect(() => {
    const updateNavbar = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", updateNavbar, { passive: true });
    updateNavbar();
    return () => window.removeEventListener("scroll", updateNavbar);
  }, []);

  const goToSection = (event, sectionId, menuItem) => {
    setMenu(menuItem);
    if (location.pathname === "/") {
      event.preventDefault();
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const Logout =() =>{
    localStorage.removeItem("token");
    dispatch(setToken(""))
    setIsProfileOpen(false)
    navigate("/")
  }
 

 

  return (
    <div className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      <Link to='/' className="logo" onClick={()=>setMenu("Home")}>QuickFood</Link>
     
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
        <Link to='/#explore-menu' onClick={(event)=>goToSection(event, "explore-menu", "Menu")} className={menu === "Menu" ?"active":""}>Menu</Link>
        <Link to='/#app-download' onClick={(event)=>goToSection(event, "app-download", "Mobile-App")} className={menu === "Mobile-App" ?"active":""}>Get the App</Link>
        <Link to='/#footer' onClick={(event)=>goToSection(event, "footer", "Contact Us")} className={menu === "Contact Us" ?"active" :""}>Contact</Link>
      </ul>
      <div className="navbar-right">

        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={totalCartAmount===0 ? "" :"dot" }></div>
        </div>
       {!token? <button onClick={()=>setShowLogin(true)}>Sign in</button>
       :<div className="navbar-profile">
        <button
          type="button"
          className="navbar-profile-trigger"
          onClick={() => setIsProfileOpen((open) => !open)}
          aria-expanded={isProfileOpen}
          aria-label="Open profile menu"
        >
          <img src={assets.profile_icon} alt="" />
        </button>
        <ul className={`nav-profile-dropdown ${isProfileOpen ? "is-open" : ""}`}>
          <li onClick={()=>{ setIsProfileOpen(false); navigate('/myorders'); }}><img src={assets.bag_icon} alt="" />Orders</li>
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
