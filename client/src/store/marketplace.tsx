import { createSlice } from "@reduxjs/toolkit";
interface State {
  activeTags: string[];
}
const initialState: State = {
  activeTags: [],
};

export const marketplaceStoreSlice = createSlice({
  name: "Timeless Treasures Marketplace",
  initialState: initialState,
  reducers: {
    setActiveTags(state, { payload }) {
      state.activeTags = payload;
    },
  },
});

export const marketplaceStoreActions = marketplaceStoreSlice.actions;
