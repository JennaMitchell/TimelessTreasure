import { createSlice } from "@reduxjs/toolkit";
interface State {
  activeTags: string[];
  retrievedData: any[];
  recentlyViewedProduct: any[];
}
const initialState: State = {
  activeTags: [],
  retrievedData: [],
  recentlyViewedProduct: [],
};

export const marketplaceStoreSlice = createSlice({
  name: "Timeless Treasures Marketplace",
  initialState: initialState,
  reducers: {
    setActiveTags(state, { payload }) {
      state.activeTags = payload;
    },
    setRetrievedData(state, { payload }) {
      state.retrievedData = payload;
    },
    setRecentlyViewedProduct(state, { payload }) {
      state.recentlyViewedProduct = payload;
    },
  },
});

export const marketplaceStoreActions = marketplaceStoreSlice.actions;
