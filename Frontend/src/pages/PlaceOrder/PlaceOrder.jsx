import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./PlaceOrder.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_URL, selectTotalCartAmount, setToken } from '../../store/store'

const PlaceOrder = () => {
  const dispatch = useDispatch()
  const {token, foodList: food_list, cartItems} = useSelector((state) => state.shop)
  const totalCartAmount = useSelector(selectTotalCartAmount)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [data,setData] =useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onchangeHandler =(event)=>{
    const name =event.target.name;
    const value =event.target.value;
    setData(data=>({...data,[name]:value}))
  }
const placeOrder =async (event) =>{
 event.preventDefault();
 if (isSubmitting) return;
 let orderItems =[];
 food_list.map((item)=>{
  if(cartItems[item._id]>0){
    const itemInfo = {...item, quantity: cartItems[item._id]};
    orderItems.push(itemInfo);
  }
 })
 let orderData ={
  address:data,
  items:orderItems,
  amount:totalCartAmount+10,
 }
 try {
   setIsSubmitting(true);
   const response =await axios.post(API_URL+"/api/order/place", orderData,{headers:{token}});
   if(response.data.success && response.data.session_url){
    window.location.assign(response.data.session_url);
    return;
   }
   alert(response.data.message || "Unable to start payment. Please try again.");
 } catch (error) {
   if (error.response?.status === 401) {
    localStorage.removeItem("token");
    dispatch(setToken(""));
   }
   alert(error.response?.data?.message || "Unable to connect to the payment service.");
 } finally {
   setIsSubmitting(false);
 }
} 
const navigate =useNavigate();

useEffect(()=>{
 if(!token){
   navigate('/cart')
 }else if(totalCartAmount===0){
   navigate('/cart')
 }
},[token, totalCartAmount, navigate])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className='multi-field'>
          <input required name='firstName'  onChange={onchangeHandler} value={data.firstName} type="text" placeholder='First name'/>
          <input required name='lastName' onChange={onchangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
          <input required name='email' onChange={onchangeHandler} value={data.email} type="email" placeholder='Email address' />
          <input required name='street' onChange={onchangeHandler} value={data.street} type="text" placeholder='Street' />
          <div className='multi-field'>
          <input required name='city' onChange={onchangeHandler} value={data.city} type="text" placeholder='City'/>
          <input required name='state' onChange={onchangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className='multi-field'>
          <input required name='zipcode' onChange={onchangeHandler} value={data.zipcode} type="text" placeholder='Zip code'/>
          <input required name='country' onChange={onchangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onchangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${totalCartAmount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${totalCartAmount=== 0? 0:10}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${totalCartAmount===0 ?0 :totalCartAmount+10}</b>
            </div>      
          </div>
          <button type='submit' disabled={isSubmitting}>{isSubmitting ? "OPENING PAYMENT..." : "PROCEED TO PAYMENT"}</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
