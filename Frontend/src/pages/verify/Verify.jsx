import React, { useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';
import { API_URL } from '../../store/store';

const Verify = () => {

  const [searchParams ,setSearchParams] = useSearchParams();
  const success =searchParams.get("success")
  const orderId =searchParams.get("orderId")
  const navigate = useNavigate();

  const verifyPayment =async()=>{
    const reponse =await axios.post(API_URL+"/api/order/verify",{success,orderId})
    if(reponse.data.success){
  navigate("/myorders");
    }else{
      navigate("/")
    }
  }

  useEffect(()=>{
    verifyPayment()
  },[])

 
  return (
    <div className='verify'>
      <div className="spinner"></div>
      
    </div>
  )
}

export default Verify
