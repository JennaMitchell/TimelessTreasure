import { mainStoreSliceActions } from "../../store/store";

export const updateUsernameCall = async (
  dispatch: any,
  signupData: any,
  token: string
) => {
  try {
    const fetchedResponse = await fetch(
      "http://localhost:5000/update/update-username",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(signupData),
      }
    );
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
    const fetchedResponse = await fetch(
      "http://localhost:5000/update/update-email",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(signupData),
      }
    );
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
    const fetchedResponse = await fetch(
      "http://localhost:5000/update/update-password",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(signupData),
      }
    );
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
    const fetchedResponse = await fetch(
      "http://localhost:5000/update/delete-account",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(signupData),
      }
    );
    return fetchedResponse;
  } catch (error) {
    dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
    dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
  }
};
