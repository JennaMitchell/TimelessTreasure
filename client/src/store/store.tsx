import { createSlice, configureStore } from "@reduxjs/toolkit";
import { userStoreSlice } from "./user-store";

const initialState = {
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
  postPopupType: "Cermaics",
  deletePostPopup: false,
  editPostPopup: false,
  activeEditPostPopupId: "",
  navMenuSubCategoryClicked: [],
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
    setPostPopupType(state, { payload }) {
      state.postPopupType = payload;
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
  },
});
const store = configureStore({
  reducer: {
    mainStore: mainStoreSlice.reducer,
    userStore: userStoreSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// used to set it so our usestate perfectly match what is in the store
export type AppDispatch = typeof store.dispatch;
// dispatch is used to type or dispatch actions

export const mainStoreSliceActions = mainStoreSlice.actions;

export default store;
