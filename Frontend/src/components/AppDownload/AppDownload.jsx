import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>Order even faster with the <br /> QuickFood app</p>
      <div className='app-download-platforms'>
        <img src={assets.play_store} alt="Download QuickFood on Google Play" />
        <img src={assets.app_store} alt="Download QuickFood on the App Store" />
      </div>
      
    </div>
  )
}

export default AppDownload
