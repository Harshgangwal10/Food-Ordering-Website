import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
<div className="footer-content">
  <div className="footer-left-content">
    <p>Fresh meals, simple checkout and order updates from kitchen to doorstep—whenever hunger calls.</p>
   <div className="footer-social-icon">
     <img src={assets.facebook_icon} alt="" />
    <img src={assets.twitter_icon}alt="" />
    <img src={assets.linkedin_icon} alt="" />
    </div>
  </div>
  <div className="footer-center-content">
   <h2>Company</h2>
   <ul>
    <li><a href="/#home">Home</a></li>
    <li><a href="/#explore-menu">Browse menu</a></li>
    <li><a href="/#app-download">Get the app</a></li>
    <li><a href="/#footer">Contact</a></li>
   </ul>
  </div>
  
  <div className="footer-right-content">
    <h2>Get In Touch</h2>
    <li><a href="tel:+91212456789">+91 212 456 789</a></li>
    <li><a href="mailto:contact@quickfood.com">contact@quickfood.com</a></li>
  </div>
</div>
<hr />
<p className='footer-copyright'>© 2026 QuickFood. All rights reserved.</p>
      
    </div>
  )
}

export default Footer
