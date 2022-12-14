import { createSlice, configureStore } from "@reduxjs/toolkit";
import { userStoreSlice } from "./user-store";
import { marketplaceStoreSlice } from "./marketplace";
import { cartStoreSlice } from "./cart";
import { sellerStoreSlice } from "./seller";
interface State {
  activePage: string;
  loginPopupActive: boolean;
  signupPopupActive: boolean;
  lockViewport: boolean;
  userAuthenticated: boolean;
  authenticationLoading: boolean;
  apiCallMessage: string;
  apiCallMessageType: string;
  apiCallDropDownMove: boolean;
  apiCallDropdownActive: boolean;
  forgotPasswordPopupActive: boolean;
  loggedInDropDownActive: boolean;
  newPostPopupActive: boolean;
  deletePostPopup: boolean;
  editPostPopup: boolean;
  activeEditPostPopupId: string;
  navMenuSubCategoryClicked: string[];
  productPopupActive: boolean;
  signupThankYouPopupActive: boolean;
  selectedPriceType: string;
  lockScreenHeight: number;
  pictureSelectionPopupActive: boolean;
}

const initialState: State = {
  activePage: "Home",
  loginPopupActive: false,
  signupPopupActive: false,
  lockViewport: false,
  userAuthenticated: false,
  authenticationLoading: false,
  apiCallMessage: "",
  apiCallMessageType: "",
  apiCallDropDownMove: false,
  apiCallDropdownActive: false,
  forgotPasswordPopupActive: false,
  loggedInDropDownActive: false,
  newPostPopupActive: false,
  deletePostPopup: false,
  editPostPopup: false,
  activeEditPostPopupId: "",
  navMenuSubCategoryClicked: [],
  productPopupActive: false,
  signupThankYouPopupActive: false,
  selectedPriceType: "USD",
  lockScreenHeight: 0,
  pictureSelectionPopupActive: true,
};

const mainStoreSlice = createSlice({
  name: "Timeless Treasures Main Store",
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
    setAuthenticationLoading(state, { payload }) {
      state.authenticationLoading = payload;
    },
    setAPICallMessageType(state, { payload }) {
      state.apiCallMessageType = payload;
    },
    setAPICallMessage(state, { payload }) {
      state.apiCallMessage = payload;
    },
    setApiCallDropDownMove(state, { payload }) {
      state.apiCallDropDownMove = payload;
    },
    setApiCallDropdownActive(state, { payload }) {
      state.apiCallDropdownActive = payload;
    },
    setForgotPasswordPopupActive(state, { payload }) {
      state.forgotPasswordPopupActive = payload;
    },
    setLoggedInDropDownActive(state, { payload }) {
      state.loggedInDropDownActive = payload;
    },
    setNewPostPopupActive(state, { payload }) {
      state.newPostPopupActive = payload;
    },
    setDeletePostPopup(state, { payload }) {
      state.deletePostPopup = payload;
    },
    setEditPostPopup(state, { payload }) {
      state.editPostPopup = payload;
    },
    setActiveEditPostPopupId(state, { payload }) {
      state.activeEditPostPopupId = payload;
    },
    setNavMenuSubCategoryClicked(state, { payload }) {
      state.navMenuSubCategoryClicked = payload;
    },
    setProductPopupActive(state, { payload }) {
      state.productPopupActive = payload;
    },
    setSignupThankYouPopupActive(state, { payload }) {
      state.signupThankYouPopupActive = payload;
    },
    setSelectedPriceType(state, { payload }) {
      state.selectedPriceType = payload;
    },
    setLockScreenHeight(state, { payload }) {
      state.lockScreenHeight = payload;
    },
    setPictureSelectionPopupActive(state, { payload }) {
      state.pictureSelectionPopupActive = payload;
    },
  },
});
const store = configureStore({
  reducer: {
    mainStore: mainStoreSlice.reducer,
    userStore: userStoreSlice.reducer,
    marketStore: marketplaceStoreSlice.reducer,
    cartStore: cartStoreSlice.reducer,
    sellerStore: sellerStoreSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// used to set it so our usestate perfectly match what is in the store
export type AppDispatch = typeof store.dispatch;
// dispatch is used to type or dispatch actions

export const mainStoreSliceActions = mainStoreSlice.actions;

export default store;
