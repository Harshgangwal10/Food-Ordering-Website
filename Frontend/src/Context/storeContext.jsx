import axios from "axios";
import { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, setCartItems as setCartState, setFoodList, setToken as setReduxToken } from "../store/store";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { cartItems, foodList: food_list, token } = useSelector((state) => state.shop);
  const url = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const setToken = (value) => dispatch(setReduxToken(value));
  const setCartItems = (value) => dispatch(setCartState(value));

  const addToCart = async (itemId) => {
    dispatch(addItem(itemId));
    if (token) await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
  };

  const removeFromCart = async (itemId) => {
    dispatch(removeItem(itemId));
    if (token) await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
  };

  const getTotalCartAmount = () => Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
    const item = food_list.find((product) => product._id === itemId);
    return total + (item ? item.price * quantity : 0);
  }, 0);

  useEffect(() => {
    const loadData = async () => {
      const foodResponse = await axios.get(`${url}/api/food/list`);
      dispatch(setFoodList(foodResponse.data.data));
      if (token) {
        const cartResponse = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
        if (cartResponse.data.success) dispatch(setCartState(cartResponse.data.cartData));
      }
    };
    loadData().catch(console.error);
  }, [dispatch, token]);

  return <StoreContext.Provider value={{ food_list, cartItems, setCartItems, addToCart, removeFromCart, getTotalCartAmount, url, token, setToken }}>{children}</StoreContext.Provider>;
};

export default StoreContextProvider;
