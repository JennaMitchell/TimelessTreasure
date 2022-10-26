import { mainStoreSliceActions } from "../../store/store";

export const newProductCall = async (
  dispatch: any,
  formData: any,
  token: string
) => {
  try {
    const fetchedResponse = await fetch(
      "http://localhost:5000/product/get-all",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      }
    );
    return fetchedResponse;
  } catch (error) {
    dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
    dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
  }
};
