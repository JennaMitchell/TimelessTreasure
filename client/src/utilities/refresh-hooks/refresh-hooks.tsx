import { mainStoreSliceActions } from "../../store/store";
import { userStoreSliceActions } from "../../store/user-store";

export const clearUserStateData = (dispatch: any) => {
  dispatch(userStoreSliceActions.setUserToken(""));
  dispatch(userStoreSliceActions.setUserLoggedIn(false));
  dispatch(userStoreSliceActions.setSessionId(""));
  dispatch(userStoreSliceActions.setUserId(""));
  dispatch(userStoreSliceActions.setUserEmail(""));
  dispatch(userStoreSliceActions.setUsername(""));
  dispatch(userStoreSliceActions.setAutoLogoutTime(""));
  dispatch(userStoreSliceActions.setIsSeller(false));
};

export const clearActivePopups = (dispatch: any) => {
  dispatch(mainStoreSliceActions.setSignupPopupActive(false));
  dispatch(mainStoreSliceActions.setNewPostPopupActive(false));
  dispatch(mainStoreSliceActions.setLoginPopupActive(false));
  dispatch(mainStoreSliceActions.setLoggedInDropDownActive(false));
  dispatch(mainStoreSliceActions.setForgotPasswordPopupActive(false));
  dispatch(mainStoreSliceActions.setApiCallDropdownActive(false));
  dispatch(mainStoreSliceActions.setLoggedInDropDownActive(false));
};
