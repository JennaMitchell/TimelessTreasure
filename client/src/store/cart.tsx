import { createSlice } from "@reduxjs/toolkit";

export interface CartDataInterface {
  imageUrl: string;
  title: string;
  quantity: number;
  price: string;
  description: string;
  productId: string;
  quantityAvailable: number;
}
interface State {
  cartData: CartDataInterface[];
}
const initialState: State = {
  cartData: [],
};

export const cartStoreSlice = createSlice({
  name: "Timeless Treasures Cart",
  initialState: initialState,
  reducers: {
    setCartData(state, { payload }) {
      state.cartData = payload;
    },
  },
});

export const cartStoreActions = cartStoreSlice.actions;
