import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { token: localStorage.getItem("token") || "", cartItems: {}, foodList: [] };
const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setToken: (state, action) => { state.token = action.payload; },
    setFoodList: (state, action) => { state.foodList = action.payload; },
    setCartItems: (state, action) => { state.cartItems = action.payload; },
    addItem: (state, action) => { state.cartItems[action.payload] = (state.cartItems[action.payload] || 0) + 1; },
    removeItem: (state, action) => { if (state.cartItems[action.payload] > 1) state.cartItems[action.payload]--; else delete state.cartItems[action.payload]; },
  },
});

export const { setToken, setFoodList, setCartItems, addItem, removeItem } = shopSlice.actions;
export const store = configureStore({ reducer: { shop: shopSlice.reducer } });
