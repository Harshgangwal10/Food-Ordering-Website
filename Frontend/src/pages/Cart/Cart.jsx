import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { API_URL, removeFromCart, selectTotalCartAmount } from "../../store/store";
const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, foodList: food_list, token } = useSelector((state) => state.shop);
  const totalCartAmount = useSelector(selectTotalCartAmount);
  const navigate =useNavigate();
  return (
    <div className="cart">
      <button className="cart-back-home" type="button" onClick={() => navigate('/')} aria-label="Go back home">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
      </button>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={API_URL+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => dispatch(removeFromCart(item._id, token))} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      <div className="cart-bottom">
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
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
<div>
  <p>If you have a promo code ,Enter it here</p>
  <div className="cart-promocode-input">
    <input type="text" placeholder="promo code" />
    <button>Submit</button>
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
