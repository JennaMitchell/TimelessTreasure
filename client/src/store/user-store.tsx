import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userToken: "",
  userId: "",
  userLoggedIn: false,
  userEmail: "",
  username: "",
  autoLogoutTime: "",
  sessionId: "",
  isSeller: false,
  sellerData: [],
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
  },
});

export const userStoreSliceActions = userStoreSlice.actions;
