import { mainStoreSliceActions } from "../../store/store";
import { databaseURL } from "../constants/constants";
export const getBuyerUserData = async (
  dispatch: any,
  userId: string,
  token: string
) => {
  try {
    const fetchedResponse = await fetch(
      `${databaseURL}/user/get-buyer-info/${userId}`,
      { method: "GET", headers: { Authorization: "Bearer " + token } }
    );
    return fetchedResponse;
  } catch (error) {
    dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
    dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
  }
};
export const getSellerUserData = async (
  dispatch: any,
  userId: string,
  token: string
) => {
  try {
    const fetchedResponse = await fetch(
      `${databaseURL}/user/get-seller-info/${userId}`,
      { method: "GET", headers: { Authorization: "Bearer " + token } }
    );
    return fetchedResponse;
  } catch (error) {
    dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
    dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
  }
};

export const updateUsernameCall = async (
  dispatch: any,
  signupData: any,
  token: string
) => {
  try {
    const fetchedResponse = await fetch(`${databaseURL}/user/update-username`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(signupData),
    });
    return fetchedResponse;
  } catch (error) {
    dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
    dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
  }
};

export const updateEmailCall = async (
  dispatch: any,
  signupData: any,
  token: string
) => {
  try {
    const fetchedResponse = await fetch(`${databaseURL}/user/update-email`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(signupData),
    });
    return fetchedResponse;
  } catch (error) {
    dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
    dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
  }
};
export const updatePasswordCall = async (
  dispatch: any,
  signupData: any,
  token: string
) => {
  try {
    const fetchedResponse = await fetch(`${databaseURL}/user/update-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(signupData),
    });
    return fetchedResponse;
  } catch (error) {
    dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
    dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
  }
};

export const deleteAccountCall = async (
  dispatch: any,
  signupData: any,
  token: string
) => {
  try {
    const fetchedResponse = await fetch(`${databaseURL}/user/delete-account`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(signupData),
    });
    return fetchedResponse;
  } catch (error) {
    dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
    dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
  }
};
