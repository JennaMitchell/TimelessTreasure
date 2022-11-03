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
  orderedProductStatusArray: string[];
  orderedArrayOfProductIds: string[];
}
const initialState: State = {
  cartData: [],
  orderedProductStatusArray: [],
  orderedArrayOfProductIds: [],
};

export const cartStoreSlice = createSlice({
  name: "Timeless Treasures Cart",
  initialState: initialState,
  reducers: {
    setCartData(state, { payload }) {
      state.cartData = payload;
    },
    setOrderedProductStatusArray(state, { payload }) {
      state.orderedProductStatusArray = payload;
    },
    setOrderedArrayOfProductIds(state, { payload }) {
      state.orderedArrayOfProductIds = payload;
    },
  },
});

export const cartStoreActions = cartStoreSlice.actions;
