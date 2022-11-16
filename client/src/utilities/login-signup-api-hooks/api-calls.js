import { mainStoreSliceActions } from "../../store/store";
import { clearUserStateData } from "../refresh-hooks/refresh-hooks";

export const signupCall = async (dispatch, signupData) => {
  try {
    const fetchedResponse = await fetch("http://localhost:5000/auth/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });
    return fetchedResponse;

    // this.props.history.replace("/");
  } catch (error) {
    dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
    dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
  }
};

export const loginCall = async (dispatch, loginData) => {
  try {
    const fetchedResponse = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    return fetchedResponse;
  } catch (error) {
    dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
    dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
  }
};

export const logoutHandler = (dispatch, navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiryDate");
  localStorage.removeItem("userId");
  clearUserStateData(dispatch);

  navigate("/");
};
