import { mainStoreSliceActions } from "../../store/store";

export const newProductCall = async (
  dispatch: any,
  formData: any,
  token: string
) => {
  try {
    const fetchedResponse = await fetch("http://localhost:5000/product/new", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });
    return fetchedResponse;
  } catch (error) {
    dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
    dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
  }
};
export const getSellersItemsForSaleCall = async (
  dispatch: any,
  sellerId: any,
  token: string
) => {
  try {
    const fetchedResponse = await fetch(
      `http://localhost:5000/product/seller-items-for-sale/${sellerId}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return fetchedResponse;
  } catch (error) {
    dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
    dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
  }
};
export const deleteItemForSaleCall = async (
  dispatch: any,
  deleteData: any,
  token: string
) => {
  try {
    const fetchedResponse = await fetch(
      `http://localhost:5000/product/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(deleteData),
      }
    );
    return fetchedResponse;
  } catch (error) {
    dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
    dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
  }
};
export const updateProductCall = async (
  dispatch: any,
  formData: any,
  token: string
) => {
  try {
    const fetchedResponse = await fetch(
      "http://localhost:5000/product/update",
      {
        method: "PATCH",
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