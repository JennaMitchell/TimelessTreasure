import { createSlice } from "@reduxjs/toolkit";
interface SelectedItem {
  [key: string]: string;
}
interface State {
  userToken: string;
  userId: string;
  userLoggedIn: boolean;
  userEmail: string;
  username: string;
  autoLogoutTime: string;
  sessionId: string;
  isSeller: boolean;
  sellerData: string[];
  sellerNewPostTags: SelectedItem;
  sellerNewPostPriceType: string;
  sellerNewPostProductCategory: string;
}

const initialState: State = {
  userToken: "",
  userId: "",
  userLoggedIn: false,
  userEmail: "",
  username: "",
  autoLogoutTime: "",
  sessionId: "",
  isSeller: false,
  sellerData: [],
  sellerNewPostTags: {},
  sellerNewPostPriceType: "USD",
  sellerNewPostProductCategory: "Ceramics",
};

export const userStoreSlice = createSlice({
  name: "Timeless Treasures User Data",
  initialState: initialState,
  reducers: {
    setUserToken(state, { payload }) {
      state.userToken = payload;
    },
    setUserId(state, { payload }) {
      state.userId = payload;
    },
    setUserLoggedIn(state, { payload }) {
      state.userLoggedIn = payload;
    },
    setUserEmail(state, { payload }) {
      state.userEmail = payload;
    },
    setUsername(state, { payload }) {
      state.username = payload;
    },
    setAutoLogoutTime(state, { payload }) {
      state.autoLogoutTime = payload;
    },
    setSessionId(state, { payload }) {
      state.sessionId = payload;
    },
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
  },
});

export const userStoreSliceActions = userStoreSlice.actions;
