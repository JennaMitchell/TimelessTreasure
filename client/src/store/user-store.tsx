import { createSlice } from "@reduxjs/toolkit";

interface State {
  userToken: string;
  userId: string;
  userLoggedIn: boolean;
  userEmail: string;
  username: string;
  autoLogoutTime: string;
  sessionId: string;
  buyerPendingOrders: any[];
  buyerFulfilledOrders: any[];
}

const initialState: State = {
  userToken: "",
  userId: "",
  userLoggedIn: false,
  userEmail: "",
  username: "",
  autoLogoutTime: "",
  sessionId: "",
  buyerPendingOrders: [],
  buyerFulfilledOrders: [],
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
    setBuyerPendingOrders(state, { payload }) {
      state.buyerPendingOrders = payload;
    },
    setBuyerFulfilledOrders(state, { payload }) {
      state.buyerFulfilledOrders = payload;
    },
  },
});

export const userStoreSliceActions = userStoreSlice.actions;
