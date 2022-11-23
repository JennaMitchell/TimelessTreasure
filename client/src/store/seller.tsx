import { createSlice } from "@reduxjs/toolkit";
interface SelectedItem {
  [key: string]: string;
}
interface State {
  isSeller: boolean;
  sellerData: string[];
  sellerNewPostTags: SelectedItem;
  sellerNewPostPriceType: string;
  sellerNewPostProductCategory: string;
  sellerPendingOrderData: any[];
  sellerFulfilledOrderData: any[];
  newPostSelectedPhotoLink: number;
}
const initialState: State = {
  isSeller: false,
  sellerData: [],
  sellerNewPostTags: {},
  sellerNewPostPriceType: "USD",
  sellerNewPostProductCategory: "Ceramics",
  sellerPendingOrderData: [],
  sellerFulfilledOrderData: [],
  newPostSelectedPhotoLink: -1,
};

export const sellerStoreSlice = createSlice({
  name: "Timeless Treasures Seller Store",
  initialState: initialState,
  reducers: {
    setIsSeller(state, { payload }) {
      state.isSeller = payload;
    },
    setSellerData(state, { payload }) {
      state.sellerData = payload;
    },
    setSellerNewPostTags(state, { payload }) {
      state.sellerNewPostTags = payload;
    },
    setSellerNewPostPriceType(state, { payload }) {
      state.sellerNewPostPriceType = payload;
    },
    setSellerNewPostProductCategory(state, { payload }) {
      state.sellerNewPostProductCategory = payload;
    },
    setSellerPendingOrderData(state, { payload }) {
      state.sellerPendingOrderData = payload;
    },
    setSellerFulfilledOrderData(state, { payload }) {
      state.sellerFulfilledOrderData = payload;
    },
    setNewPostSelectedPhotoLink(state, { payload }) {
      state.newPostSelectedPhotoLink = payload;
    },
  },
});

export const sellerStoreActions = sellerStoreSlice.actions;
