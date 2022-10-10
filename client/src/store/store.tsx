import { createSlice, configureStore } from "@reduxjs/toolkit";
// PayloadAction
// import { quizStoreSlice } from "./quiz-store-slice";
// import { sheetGeneratorStoreSlice } from "./sheet-generator-slice";
const initialState = {
  activePage: "Home",
  loginPopupActive: false,
  signupPopupActive: false,
  lockViewport: false,
  userAuthenticated: false,
  userToken: "",
  userId: "",
  authenticationLoading: false,
  dropdownMessage: "",
  dropdownMessageType: "",
};

const mainStoreSlice = createSlice({
  name: "Timless Treasures Main Store",
  initialState: initialState,
  reducers: {
    setActivePage(state, { payload }) {
      state.activePage = payload;
    },
    setLoginPopupActive(state, { payload }) {
      state.loginPopupActive = payload;
    },
    setLockViewPort(state, { payload }) {
      state.lockViewport = payload;
    },
    setSignupPopupActive(state, { payload }) {
      state.signupPopupActive = payload;
    },
    setUserAuthenticated(state, { payload }) {
      state.userAuthenticated = payload;
    },
    setUserToken(state, { payload }) {
      state.userToken = payload;
    },
    setUserId(state, { payload }) {
      state.userId = payload;
    },
    setAuthenticationLoading(state, { payload }) {
      state.authenticationLoading = payload;
    },
    setDropdownMessageType(state, { payload }) {
      state.dropdownMessageType = payload;
    },
    setDropdownMessage(state, { payload }) {
      state.dropdownMessage = payload;
    },
  },
});
const store = configureStore({
  reducer: {
    mainStore: mainStoreSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// used to set it so our usestate perfectly match what is in the store
export type AppDispatch = typeof store.dispatch;
// dispatch is used to type or dispatch actions

export const mainStoreSliceActions = mainStoreSlice.actions;

export default store;
