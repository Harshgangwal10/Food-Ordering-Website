import React, { useContext, useEffect, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../Context/storeContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a delay to fetch food list
    if (food_list.length > 0) {
      setLoading(false);
    }
  }, [food_list]);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you ! </h2>
      {loading ? (
        <div className="loading"><h1>Loading...</h1></div> // You can replace this with a spinner
      ) : (
        <div className="food-display-list">
          {food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
