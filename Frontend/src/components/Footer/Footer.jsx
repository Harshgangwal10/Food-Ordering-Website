import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
<div className="footer-content">
  <div className="footer-left-content">
    <img src={assets.logo} alt="" />
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae perspiciatis quod eveniet odit quisquam cumque! Veritatis quo vitae aliquam tenetur eos quas assumenda architecto ex aliquid. Officiis nisi autem harum.</p>
   <div className="footer-social-icon">
     <img src={assets.facebook_icon} alt="" />
    <img src={assets.twitter_icon}alt="" />
    <img src={assets.linkedin_icon} alt="" />
    </div>
  </div>
  <div className="footer-center-content">
   <h2>Company</h2>
   <ul>
    <li>Home </li>
    <li>About us</li>
    <li>Delivery</li>
    <li>Privacy policy</li>
   </ul>
  </div>
  
  <div className="footer-right-content">
    <h2>Get In Touch</h2>
    <li>+91-212-456-789</li>
    <li>contact@quickfood.com</li>
  </div>
</div>
<hr />
<p className='footer-copyright'>Copyright 2025 @ QuickFood.com -All Right Reserved.</p>
      
    </div>
  )
}

export default Footer
