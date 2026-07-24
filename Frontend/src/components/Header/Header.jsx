import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
const Header = () => {
  return (
    <div className='header' id='home'>
      <div className="header-content">
        <h2>Your favourite food, delivered fresh</h2>
        <p>Discover comforting classics, quick bites and satisfying meals—then order in just a few taps.</p>
        <Link to="/#explore-menu" className="header-menu-link">Explore the menu</Link>
      </div>
    </div>
  )
}

export default Header
