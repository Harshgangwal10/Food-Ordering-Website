import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { API_URL, addToCart, removeFromCart } from "../../store/store";

const FoodItem = ({ id, name, price, description, image }) => {
  const dispatch = useDispatch();
  const { cartItems, token } = useSelector((state) => state.shop);
  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img
          className="food-item-image"
          src={API_URL + "/images/" + image}
          alt={name}
          loading="lazy"
          decoding="async"
        />
        {!cartItems[id] || cartItems[id] === 0 ? (
          <img
            className="add"
            onClick={() => dispatch(addToCart(id, token))}
            src={assets.add_icon_white}
          ></img>
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => dispatch(removeFromCart(id, token))}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => dispatch(addToCart(id, token))}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-des">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
