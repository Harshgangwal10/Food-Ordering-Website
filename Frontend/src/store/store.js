import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: localStorage.getItem("token") || "",
  cartItems: {},
  foodList: [],
  foodStatus: "idle",
  foodError: "",
};
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const loadFoodList = createAsyncThunk(
  "shop/loadFoodList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/food/list`);
      if (!response.data.success) {
        return rejectWithValue(response.data.message || "Unable to load the menu.");
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Unable to load the menu."
      );
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(loadFoodList.pending, (state) => {
        state.foodStatus = "loading";
        state.foodError = "";
      })
      .addCase(loadFoodList.fulfilled, (state, action) => {
        state.foodList = action.payload;
        state.foodStatus = "succeeded";
      })
      .addCase(loadFoodList.rejected, (state, action) => {
        state.foodStatus = "failed";
        state.foodError = action.payload || "Unable to load the menu.";
      });
  },
});

export const { setToken, setFoodList, setCartItems, addItem, removeItem } = shopSlice.actions;

export const loadCart = (token) => async (dispatch) => {
  const response = await axios.post(`${API_URL}/api/cart/get`, {}, { headers: { token } });
  if (response.data.success) dispatch(setCartItems(response.data.cartData));
};

export const addToCart = (itemId, token) => async (dispatch) => {
  dispatch(addItem(itemId));
  if (token) await axios.post(`${API_URL}/api/cart/add`, { itemId }, { headers: { token } });
};

export const removeFromCart = (itemId, token) => async (dispatch) => {
  dispatch(removeItem(itemId));
  if (token) await axios.post(`${API_URL}/api/cart/remove`, { itemId }, { headers: { token } });
};

export const selectTotalCartAmount = (state) => Object.entries(state.shop.cartItems).reduce((total, [itemId, quantity]) => {
  const item = state.shop.foodList.find((product) => product._id === itemId);
  return total + (item ? item.price * quantity : 0);
}, 0);

export const store = configureStore({ reducer: { shop: shopSlice.reducer } });
