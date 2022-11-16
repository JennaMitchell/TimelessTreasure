import { createSlice } from "@reduxjs/toolkit";
interface State {
  activeTags: string[];
  retrievedData: any[];
  recentlyViewedProduct: any[];
  numberOfItemsPerPage: number;
  activePageNumber: number;
  marketplaceMenuMoveOut: boolean;
}
const initialState: State = {
  activeTags: [],
  retrievedData: [],
  recentlyViewedProduct: [],
  numberOfItemsPerPage: 9,
  activePageNumber: 1,
  marketplaceMenuMoveOut: false,
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
    setNumberOfItemsPerPage(state, { payload }) {
      state.numberOfItemsPerPage = payload;
    },
    setActivePageNumber(state, { payload }) {
      state.activePageNumber = payload;
    },
    setMarketplaceMenuMoveOut(state, { payload }) {
      state.marketplaceMenuMoveOut = payload;
    },
  },
});

export const marketplaceStoreActions = marketplaceStoreSlice.actions;
