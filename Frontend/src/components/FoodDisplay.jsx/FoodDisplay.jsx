import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { loadFoodList } from '../../store/store';

const FoodDisplay = ({ category }) => {
  const dispatch = useDispatch();
  const { foodList: food_list, foodStatus, foodError } = useSelector((state) => state.shop);
  const filteredFood = food_list.filter((item) => category === "All" || category === item.category);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      {foodStatus === "idle" || foodStatus === "loading" ? (
        <div className="loading"><h1>Loading...</h1></div> 
      ) : foodStatus === "failed" ? (
        <div className="loading">
          <p>{foodError}</p>
          <button type="button" onClick={() => dispatch(loadFoodList())}>Try again</button>
        </div>
      ) : filteredFood.length === 0 ? (
        <div className="loading"><p>{food_list.length === 0 ? "No food items are available yet." : "No dishes in this category."}</p></div>
      ) : (
        <div className="food-display-list">
          {filteredFood.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
