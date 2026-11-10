import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './MyOrders.css'
import axios from 'axios';
import { assets } from '../../assets/assets';
import { io } from 'socket.io-client';
import { API_URL } from '../../store/store';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {

  const token = useSelector((state) => state.shop.token);
  const [data,setData] =useState([]);
  const navigate = useNavigate();

const fetchOrders = async()=>{
  const response =await axios.post(API_URL+"/api/order/userorders" ,{} ,{headers:{token}})
  setData(response.data.data);
}

useEffect(()=>{
  if(token){
    fetchOrders();
    const socket = io(API_URL,{auth:{token}});
    socket.on("order:updated", (order) => setData((orders) => orders.map((item) => item._id === order._id ? order : item)));
    return () => socket.disconnect();
  }
},[token])
  return (
    <div className='my-orders'>
      <div className="my-orders-header">
        <button className="back-home-button" type="button" onClick={() => navigate('/')} aria-label="Go back home">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>
        <h2>My Orders</h2>
      </div>
      <div className='container'>
        {data.map((order,index)=>{

          return(
            <div key={index} className='my-orders-order'>
            <img src={assets.parcel_icon} alt="" />
          <p>{order.items.map((item,index)=>{
            if(index === order.items.length -1){
              return item.name+"  x "+item.quantity;
            }else{
              return item.name+"  x "+item.quantity +", ";

            }
          })}</p>
          <p>${order.amount}.00</p>
          <p>Items: {order.items.length}</p>
          <p><span>&#x25cf;</span> <b>{order.status}</b></p>
          <button onClick={fetchOrders}>Track Order</button>
          </div>
          )
         
        })}
      </div>

    </div>
  )
}

export default MyOrders
